// Only the existing application's SQLite dialect is translated. Unknown REPLACE forms fail closed.
export function postgresSQL(input:string){
 let s=input.replace(/printf\('%04d',next_number\)/g,"lpad(next_number::text,greatest(4,length(next_number::text)),'0')").replace(/json_extract\(content,'\$\.date'\)/g,"(content::jsonb->>'date')");
 const ignore=/^INSERT OR IGNORE /i.test(s),replace=/^INSERT OR REPLACE /i.test(s);s=s.replace(/^INSERT OR (IGNORE|REPLACE) /i,'INSERT ');
 if(replace){if(!/^INSERT INTO studio_deadline_index /i.test(s))throw new Error('Unsupported replacement query');s+=' ON CONFLICT (id) DO UPDATE SET user_id=excluded.user_id,project_id=excluded.project_id,title=excluded.title,project_title=excluded.project_title,due_date=excluded.due_date,reminder_days=excluded.reminder_days,demo=excluded.demo';}
 if(ignore)s+=' ON CONFLICT DO NOTHING';
 let quote='',out='',n=0;for(let i=0;i<s.length;i++){const c=s[i];if(quote){out+=c;if(c===quote){if(s[i+1]===quote){out+=s[++i];}else quote='';}}else if(c==="'"||c==='"'){quote=c;out+=c;}else out+=c==='?'?'$'+(++n):c;}
 return out;
}
