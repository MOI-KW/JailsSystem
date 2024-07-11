import { animate, state, style, transition, trigger } from '@angular/animations';
  
export const expandableRowAnimation = trigger('expandableRow', [
    state('collapsedRow, void', style({
        visibility: 'hidden',
        border: 'none'
    })),
    state('expandedRow', style({
        height: '*',
        visibility: 'visible'
    })),
    transition(
        'expanded <=> collapsed, void <=> *',
        animate('225ms cubic-bezier(0.0, 0.0, 0.0, 1)')
    )
]);  