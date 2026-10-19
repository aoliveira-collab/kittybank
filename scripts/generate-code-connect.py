"""Generate parserless templates from the inspected Figma property/variant snapshot."""
from pathlib import Path
import json,re
root=Path(__file__).resolve().parent.parent
snapshot=json.loads((root/'figma/library.snapshot.json').read_text())
contexts={c['nodeId']:c for c in json.loads((root/'figma/code-connect-context.json').read_text())}
trees={c['id']:c for c in json.loads((root/'figma/variants.snapshot.json').read_text())}
config={
'Brand/Logo':('Logo','brand',{}),'Brand/Mark':('Mark','brand',{}),
'Button':('Button','controls',{'label':0}),'IconButton':('IconButton','controls',{}),
'Field/Text':('TextField','controls',{'label':0,'value':1,'helper':2}),
'Field/Select':('SelectField','controls',{'label':0,'value':1}),
'Selection/Checkbox':('Checkbox','controls',{'label':0}),'Selection/Switch':('Switch','controls',{}),
'Onboarding/ChoiceCard':('ChoiceCard','onboarding',{'title':0,'description':1}),
'Security/CodeCell':('CodeCell','security',{'digit':0}),'Security/OTP':('OTP','security',{'label':0}),
'Onboarding/StepProgress':('StepProgress','onboarding',{'label':0}),
'Security/DocumentUpload':('DocumentUpload','security',{'title':0,'description':1}),
'Security/Biometric':('Biometric','security',{'title':0,'instructions':1}),
'Security/PasswordRules':('PasswordRules','security',{}),
'Onboarding/ActionFooter':('ActionFooter','onboarding',{}),
'Navigation/Header':('Header','navigation',{'title':0}),'Navigation/TabItem':('TabItem','navigation',{'label':0}),
'Navigation/BottomBar':('BottomBar','navigation',{}),
'Banking/Balance':('Balance','banking',{}),'Banking/PaymentCard':('PaymentCard','banking',{'holder':2}),
'Banking/TransactionRow':('TransactionRow','banking',{'title':0,'meta':1,'amount':2}),
'Banking/QuickAction':('QuickAction','banking',{'label':0}),'Banking/SummaryRow':('SummaryRow','banking',{'label':0,'value':1}),
'Feedback/Badge':('Badge','feedback',{'label':0}),'Feedback/Alert':('Alert','feedback',{'title':0,'description':1}),
'Feedback/StateBlock':('StateBlock','feedback',{'title':0,'description':1}),
'Overlay/Confirmation':('Confirmation','feedback',{'title':0,'description':1}),
'Help/Message':('Message','help',{'message':1}),'Help/Composer':('Composer','help',{'message':0})}

def lower(x):return x[0].lower()+x[1:]
def prop(x):return ''.join(lower(w) if i==0 else w.capitalize() for i,w in enumerate(x.split(' ')))
def q(x):return json.dumps(x,ensure_ascii=False)
manifest=[]
for s in snapshot['sets']:
    path=s['name'].removeprefix('KittyBank/');name,source,roles=config[path];props=contexts[s['id']]['properties']
    url=f'https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id={s["id"].replace(":","-")}'
    lines=[f'// url={url}',f'// source=src/components/{source}.tsx',f'// component={name}',"import figma from 'figma'",'const instance = figma.selectedInstance','']
    attrs=[];declared=set();variants={}
    for p in props.values():
        key=prop(p['name']);typ=p['type'];declared.add(key)
        if typ=='VARIANT':
            variants[key]=p['variantOptions'];mapping={v:lower(v) for v in p['variantOptions']}
            lines.append(f'const {key} = instance.getEnum({q(p["name"])}, {q(mapping)})')
            attrs.append(f'{key}="${{{key}}}"')
        elif typ=='TEXT':
            lines.append(f'let {key} = instance.getString({q(p["name"])})')
            target='defaultValue' if name=='TextField' and key=='value' else 'defaultMessage' if name=='Composer' and key=='message' else key
            attrs.append(f'{target}="${{{key}}}"')
        elif typ=='BOOLEAN':
            lines.append(f'const {key} = instance.getBoolean({q(p["name"])})')
            attrs.append(f'{key}={{${{{key} ? "true" : "false"}}}}')
        elif typ=='INSTANCE_SWAP':
            lines += [f'const {key}Instance = instance.getInstanceSwap({q(p["name"])})',f'const {key}Code = {key}Instance?.type === "INSTANCE" ? {key}Instance.executeTemplate().example : undefined']
            attrs.append('${'+f'{key}Code ? figma.code`{key}={{${{{key}Code}}}}` : ""'+'}')
    for role in roles:
        if role not in declared:
            lines.append(f'let {role}: string | undefined');attrs.append(f'{role}="${{{role}}}"')
    # Read actual text layers for variant-specific copy AND text overrides on instances.
    for v in trees[s['id']]['variants']:
        pairs=[x.split('=',1) for x in v['name'].split(', ')]
        condition=' && '.join(f'{prop(k)} === {q(lower(value))}' for k,value in pairs)
        texts=[c for c in v['children'] if c['type']=='TEXT']
        statements=[]
        for role,index in roles.items():
            if index>=len(texts):continue
            t=texts[index];statements += [f'  const {role}Layer = instance.findText({q(t["name"])})',f'  if ({role}Layer.type === "TEXT") {role} = {role}Layer.textContent']
        if statements:lines += [f'if ({condition}) {{',*statements,'}']
    if name=='TextField':
        attrs=[x for x in attrs if not x.startswith('defaultValue=')]
        attrs.append('${state === "empty" ? figma.code`placeholder="${value}"` : figma.code`defaultValue="${value}"`}')
    if name=='SelectField':
        attrs=[x for x in attrs if not x.startswith('value=')]
        attrs.append('${state === "empty" ? figma.code`placeholder="${value}"` : figma.code`defaultValue="${value}"`}')
    if name=='Composer':
        attrs=[x for x in attrs if not x.startswith('defaultMessage=')]
        attrs.append('${state === "empty" ? figma.code`placeholder="${message}"` : figma.code`defaultMessage="${message}"`}')
    # Resolve all nested instances dynamically. No hardcoded JSX in slot values.
    child_specs={
    'Button':[('loadingIcon',['KittyBank/Icon/Spinner'],0)],
    'TextField':[('visibilityIcon',['KittyBank/Icon/Eye'],0)],
    'SelectField':[('icon',['KittyBank/Icon/ChevronDown'],0)],
    'Checkbox':[('icon',['KittyBank/Icon/Check'],0)],
    'DocumentUpload':[('icon',None,0)],'Biometric':[('icon',None,0)],
    'ActionFooter':[('progress',['KittyBank/Onboarding/StepProgress'],0),('action',['KittyBank/Button'],0)],
    'Header':[('leading',['KittyBank/IconButton'],0),('trailing',['KittyBank/IconButton'],1)],
    'Balance':[('icon',['KittyBank/Icon/Eye'],0)],'PaymentCard':[('icon',None,0)],'TransactionRow':[('icon',None,0)],
    'Alert':[('icon',None,0)],'StateBlock':[('icon',None,0),('action',['KittyBank/Button'],0)],
    'Confirmation':[('icon',None,0),('primaryAction',['KittyBank/Button'],0),('secondaryAction',['KittyBank/Button'],1)],
    'Composer':[('sendAction',['KittyBank/IconButton'],0)]}.get(name,[])
    for slot,names,index in child_specs:
        predicate='node.type === "INSTANCE" && '+('node.name.startsWith("KittyBank/Icon/")' if names is None else f'{q(names)}.includes(node.name)')
        lines += [f'const {slot}Node = instance.findLayers(node => {predicate})[{index}]',f'const {slot}Snippet = {slot}Node?.type === "INSTANCE" ? {slot}Node.executeTemplate().example : undefined']
        attrs.append('${'+f'{slot}Snippet ? figma.code`{slot}={{${{{slot}Snippet}}}}` : ""'+'}')
    multi={'OTP':('cells','KittyBank/Security/CodeCell',6),'BottomBar':('children','KittyBank/Navigation/TabItem',4),'PasswordRules':('icons','KittyBank/Icon/',3)}.get(name)
    if multi:
        slot,child,count=multi
        pred=f'node.name.startsWith({q(child)})' if slot=='icons' else f'node.name === {q(child)}'
        lines.append(f'const nested = instance.findLayers(node => node.type === "INSTANCE" && {pred})')
        for i in range(count):lines.append(f'const child{i} = nested[{i}]?.type === "INSTANCE" ? nested[{i}].executeTemplate().example : undefined')
        if slot=='icons':attrs.append('icons={['+', '.join('${child'+str(i)+'}' for i in range(count))+']}')
        else:attrs.append(slot+'={<>\n'+''.join('${child'+str(i)+'}' for i in range(count))+'\n</>}')
    if name=='IconButton':
        lines.append('const accessibleLabel = iconInstance?.type === "INSTANCE" ? ({"KittyBank/Icon/Back":"Voltar","KittyBank/Icon/Close":"Fechar","KittyBank/Icon/Help":"Ajuda","KittyBank/Icon/Eye":"Mostrar ou ocultar","KittyBank/Icon/ArrowRight":"Enviar"} as Record<string,string>)[iconInstance.name] ?? "Ação" : "Ação"')
        attrs.append('label="${accessibleLabel}"')
    if name=='PasswordRules':
        for i,label in enumerate(['Pelo menos 8 caracteres','Uma letra e um número','Um caractere especial']):
            lines.append(f'const rule{i} = instance.findText({q(label)})')
            lines.append(f'const ruleText{i} = rule{i}.type === "TEXT" ? rule{i}.textContent : {q(label)}')
        attrs.append('rules={["${ruleText0}", "${ruleText1}", "${ruleText2}"]}')
    slug='kittybank-'+re.sub(r'(?<!^)(?=[A-Z])','-',name).lower()
    lines += ['', 'export default {',f'  example: figma.code`<{name}\n    '+'\n    '.join(attrs)+'\n  />`,',f'  imports: [\'import {{ {name} }} from "@kittybank/react"\'],',f'  id: {q(slug)},','  metadata: { nestable: true }','}','']
    out=root/'code-connect'/f'{name}.figma.ts';out.write_text('\n'.join(lines))
    manifest.append({'component':name,'figmaName':s['name'],'nodeId':s['id'],'url':url,'source':f'src/components/{source}.tsx','template':str(out.relative_to(root)),'variants':variants,'figmaProperties':[p['name'] for p in props.values()]})
for icon in snapshot['icons']:
    name=icon['name'].split('/')[-1]+'Icon';url=f'https://www.figma.com/design/RJaBgLXi6Vf9whEbBVw3tY/Kitty-Bank-Design-System?node-id={icon["id"].replace(":","-")}'
    out=root/'code-connect/icons'/f'{name}.figma.ts';out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(f'''// url={url}
// source=src/components/icons.tsx
// component={name}
import figma from 'figma'
export default {{
  example: figma.code`<{name} />`,
  imports: ['import {{ {name} }} from "@kittybank/react"'],
  id: 'kittybank-icon-{name[:-4].lower()}',
  metadata: {{ nestable: true }}
}}
''')
    manifest.append({'component':name,'figmaName':icon['name'],'nodeId':icon['id'],'url':url,'source':'src/components/icons.tsx','template':str(out.relative_to(root)),'variants':{},'figmaProperties':[]})
(root/'code-connect/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(f'{len(manifest)} parserless templates generated.')
