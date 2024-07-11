export class TransactionFilters {
    
    public static ExecStatus: any[] = [

        { label: '0', val: '0' },
        { label: '1', val: '1' }
    ]; 

    public static Channel: any[] = [

        { label: 'SMARTPOS', val: 'SMARTPOS' },
        { label: 'GATEWAY', val: 'GATEWAY' },
        { label: 'ESTAMP', val: 'ESTAMP' },
        { label: 'CREDIT CARD', val: 'CREDIT CARD' },
        { label: 'ALL', val: 'ALL' }
    ]; 

    public static KNetStatus: any[] = [

        { label: 'APPROVED', val: 'APPROVED' },
        { label: 'CANCELED', val: 'CANCELED' },
        { label: 'CAPTURED', val: 'CAPTURED' },
        { label: 'DECLINED', val: 'DECLINED' },
        // { label: 'DENIED', val: 'DENIED' },
        { label: 'DENIED BY RISK', val: 'DENIED BY RISK' },
        { label: 'FAILURE', val: 'FAILURE' },
        { label: 'HOST TIMEOUT', val: 'HOST TIMEOUT' },
        { label: 'INITIALIZED', val: 'INITIALIZED' },
        { label: 'NOT+CAPTURED', val: 'NOT+CAPTURED' },
        { label: 'SUSPENDED', val: 'SUSPENDED' },
        { label: 'VOIDED', val: 'VOIDED' }
    ]; 

    public static Status: any[] = [

        { label: 'FAIL', val: 'FAIL' },
        { label: 'PROCESSING', val: 'PROCESSING' },
        { label: 'SUCCESS', val: 'SUCCESS' }
    ];
}

export interface listFilters {
        
    Result: string; 
    ServiceExecStatus: string;
    Source: string; 
    SvcTypeId: string
    Status: string;
}