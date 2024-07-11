export class Menu {
  Id!: number;
  Name!: string;
  Title!: string;
  Icon!: string;
  Link!: string
  Role!: string
  children!: any[];
}

export class SideMenu {
  title!: string;
  titleAr!: string;
  icon!: string;
  displayMenu!: boolean;
  router!: string;
  Role!: string
  children!: any[];
}

export class mainmenu {
  public static menuList: Menu[] = [
  ];
}
