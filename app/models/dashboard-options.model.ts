import { CompactType, DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponentInterface, GridType } from "angular-gridster2";

export class DashboardOptions implements GridsterConfig{
    gridType = GridType.Fit;
    compactType = CompactType.None;
    margin = 0;
    outerMargin = true;
    outerMarginTop = null;
    outerMarginRight = null;
    outerMarginBottom = null;
    outerMarginLeft = null;
    useTransformPositioning = true;
    mobileBreakpoint = 720;
    minCols = 5;
    maxCols = 10;
    minRows = 5;
    maxRows = 10;
    maxItemCols = 10;
    minItemCols = 5;
    maxItemRows = 10;
    minItemRows = 5;
    maxItemArea = 100;
    minItemArea = 25;
    defaultItemCols = 5;
    defaultItemRows = 5;
    fixedColWidth = 105;
    fixedRowHeight = 105;
    keepFixedHeightInMobile = false;
    keepFixedWidthInMobile = false;
    scrollSensitivity = 10;
    scrollSpeed = 20;
    enableEmptyCellClick = false;
    enableEmptyCellContextMenu = false;
    enableEmptyCellDrop = false;
    enableEmptyCellDrag = false;
    enableOccupiedCellDrop = false;
    emptyCellDragMaxCols = 50;
    emptyCellDragMaxRows = 50;
    ignoreMarginInRow = false;
    public draggable = {
      enabled: true,
      delayStart: 200,
      start: () => {},
      stop: () => {}
    };
    public resizable = {
      enabled: true,
      delayStart: 200,
      start: () => {},
      stop: () => {}
    };
    swap = true;
    pushItems = false;
    disablePushOnDrag = false;
    disablePushOnResize = false;
    pushDirections = {north: true, east: true, south: true, west: true};
    pushResizeItems = true;
    displayGrid = DisplayGrid.Always;
    disableWindowResize = false;
    disableWarnings = false;
    scrollToNewItems = false;
    api = {
      resize: () => {},
      optionsChanged: () => {},
    };
    itemChangeCallback = (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => {};
}