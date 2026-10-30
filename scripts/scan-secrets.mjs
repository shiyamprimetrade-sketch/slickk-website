import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const files=execFileSync('git',['ls-files','--cached','--others','--exclude-standard'],{encoding:'utf8'}).split(/\r?\n/).filter(Boolean);
const forbiddenName=/(^|\/)(\.env(\.|$)|\.dev\.vars|PRIVATE_CREDENTIALS|credentials\.json$|service-account.*\.json$)/i;
const secretPattern=/(AIza[\w-]{25,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|sk-[A-Za-z0-9]{32,}|CLOUDFLARE_API_TOKEN\s*=\s*[A-Za-z0-9_-]{20,})/;
const hits=[];
for(const file of files){
  const normalized=file.replaceAll('\\','/');
  if(normalized!=='.env.example' && forbiddenName.test(normalized)){hits.push(normalized+': forbidden filename');continue;}
  let source; try{source=readFileSync(file);}catch{continue;}
  if(source.includes(0))continue;
  if(secretPattern.test(source.toString('utf8')))hits.push(normalized+': secret pattern');
}
if(hits.length){console.error(hits.join('\n'));process.exitCode=1;}
else console.log(`Secret guard passed: ${files.length} source files, no blocked names or patterns.`);
