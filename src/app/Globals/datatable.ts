export class DataTableConstants {
    
    public static ItemPerPage: number = 1000;
    public static PageSize: number[] = [1000, 2000, 5000, 10000, 15000];
}

export class DataTableFunctions {

    static resultColor(status: string = "") {

        let badgeClass: string = "";
    
        switch (status?.trim()) {

            case "APPROVED": badgeClass = "badge badge-subtle-success rounded-pill"; break; 
            case "CANCELED": badgeClass = "badge badge-subtle-secondary rounded-pill"; break; 
            case "CAPTURED": badgeClass = "badge badge-subtle-success rounded-pill"; break; 
            case "DECLINED": badgeClass = "badge badge-subtle-danger rounded-pill"; break; 
            case "DENIED": badgeClass = "badge badge-subtle-danger rounded-pill"; break; 
            case "DENIED BY RISK": badgeClass = "badge badge-subtle-danger rounded-pill"; break; 
            case "FAILURE": badgeClass = "badge badge-subtle-danger rounded-pill"; break; 
            case "HOST TIMEOUT": badgeClass = "badge badge-subtle-warning rounded-pill"; break; 
            case "INITIALIZED": badgeClass = "badge badge-subtle-primary rounded-pill"; break; 
            case "NOT+CAPTURED": badgeClass = "badge badge-subtle-danger rounded-pill"; break; 
            case "SUSPENDED": badgeClass = "badge badge-subtle-warning rounded-pill"; break; 
            case "SUSPECTED": badgeClass = "badge badge-subtle-warning rounded-pill"; break; 
            case "VOIDED": badgeClass = "badge badge-subtle-danger rounded-pill"; break; 
            case "REFUNDED": badgeClass = "badge badge-subtle-secondary rounded-pill"; break; 
            case "NOT REFUNDED": badgeClass = "badge badge-subtle-light rounded-pill"; break; 

            default: badgeClass = "badge badge-subtle-light rounded-pill"; break;
        }
    
        return badgeClass;
    }

    static execStatusColor(status: string = "") {

        let badgeClass: string = "";
    
        switch (status?.trim()) {

            case "0": badgeClass = "mx-1 badge badge-subtle-danger rounded-pill"; break; 
            case "1": badgeClass = "mx-1 badge badge-subtle-success rounded-pill"; break; 

            default: badgeClass = "mx-1 badge badge-subtle-light rounded-pill"; break;
        }
    
        return badgeClass;
    }

    static statusColor(status: string = "") {

        let badgeClass: string = "";
    
        switch (status?.trim()) {

            case "FAIL": badgeClass = "mx-1 badge badge-subtle-danger rounded-pill"; break; 
            case "PROCESSING": badgeClass = "mx-1 badge badge-subtle-warning rounded-pill"; break; 
            case "SUCCESS": badgeClass = "mx-1 badge badge-subtle-success rounded-pill"; break; 

            case "INITIALIZED": badgeClass = ""; break; 
            case "NOT REFUNDED": badgeClass = "mx-1 badge badge-subtle-light rounded-pill"; break; 
            case "REFUNDED": badgeClass = "mx-1 badge badge-subtle-secondary rounded-pill"; break; 
            case "CANCELED": badgeClass = "mx-1 badge badge-subtle-danger rounded-pill"; break; 

            default: badgeClass = "mx-1 badge badge-subtle-light rounded-pill"; break;
        }
    
        return badgeClass;
    }
    
}