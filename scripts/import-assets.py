"""Download original Figma assets referenced by the saved design contexts."""
from pathlib import Path
import re,subprocess,json,concurrent.futures
root=Path(__file__).resolve().parent.parent
assets=root/'src/assets/figma';assets.mkdir(parents=True,exist_ok=True)
jobs={};mapping={}
for p in (root/'figma/design-context').glob('*.txt'):
    s=p.read_text();prefix=re.search(r'const assetPathPrefix = "([^"]+)"',s)
    if not prefix: continue
    mapping[p.stem]={}
    for var,file in re.findall(r'const (\w+) = `\$\{assetPathPrefix\}/([^`]+\.svg)`',s):
        jobs[file]=prefix[1]+'/'+file;mapping[p.stem][var]=file
def download(job):
    file,url=job;target=assets/file
    if not target.exists(): subprocess.run(['curl','-fL','--retry','2','--max-time','45',url,'-o',str(target)],check=True,capture_output=True)
    if target.stat().st_size==0: raise ValueError(file)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: list(pool.map(download,jobs.items()))
(root/'figma/assets.manifest.json').write_text(json.dumps(mapping,indent=2)+'\n')
print(f'{len(jobs)} original assets downloaded.')
