export function formatDate(value){if(!value)return 'No date';const d=new Date(value);return new Intl.DateTimeFormat('en',{month:'short',day:'numeric',year:'numeric'}).format(d)}
export function formatDateTime(value){if(!value)return 'No time';const d=new Date(value);return new Intl.DateTimeFormat('en',{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(d)}
