export class GridHelper{

  static pageSizeOptions: number[] = [15, 25, 50, 100];
  static columnResizingMode: string = 'widget';
  static columnChooserModes : any = [
    {
      key: 'dragAndDrop',
      name: 'Drag and drop'
    },
    {
      key: 'select',
      name: 'Select'
    }
  ];
  static editorOptions = { showClearButton: true };


  static calcDataGridHeight(gridCount: number, selectedPageSize: number): number {
    if (gridCount < 1){
      return 220;
    }
    else{
      return(220 + (22 * (selectedPageSize <= gridCount ? selectedPageSize : gridCount)));
    }
  }
}