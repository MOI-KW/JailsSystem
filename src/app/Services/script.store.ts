interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    {name: 'instanaTest', src: 'https://apptest.moi.gov.kw/eum/eum.min.js'},
    {name: 'instanaProd', src: 'https://app.moi.gov.kw/eum/eum.min.js'}
];