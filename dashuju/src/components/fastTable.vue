<template>
  <div class="ivu-table-wrapper" :class="{inlineBlock:isDouble}" style="height: 610px;">
    <div class="ivu-table ivu-table-stripe ivu-table-border ivu-table-with-fixed-top">

      <div class="ivu-table-header" ref="header">
        <table cellspacing="0" cellpadding="0" border="0" :style="styles">
          <colgroup>
            <col v-for="(column, index) in columns" :width="setCellWidth(column, index, true)">
          </colgroup>
          <thead>
          <tr>
            <th v-for="(column, index) in columns" class="ivu-table-column-center">
              <div class="ivu-table-cell">

                <span v-html="renderHeader(column, index)"></span>
                <span class="ivu-table-sort" v-if="column.sortable">
                                <i class="ivu-icon ivu-icon-arrow-up-b" :class="{on: column._sortType === 'asc'}"
                                   @click="handleSort(index, 'asc')"></i>
                                <i class="ivu-icon ivu-icon-arrow-down-b" :class="{on: column._sortType === 'desc'}"
                                   @click="handleSort(index, 'desc')"></i>
                            </span>

              </div>
            </th>
          </tr>
          </thead>
        </table>

      </div>

      <div v-show="!(!data || data.length === 0)" class="ivu-table-body" ref="body" @scroll="handleBodyScroll" style=" height: 550px;">

        <table   cellspacing="0"  cellpadding="0" border="0" :style="bstyles">
          <colgroup>
            <col v-for="(column, index) in columns" :width="setCellWidth(column, index, false)">
          </colgroup>
          <tbody class="ivu-table-tbody">
          <tr class="ivu-table-cell "
              v-for="(row, index) in data"
              :key="row"

          >
            <td v-for="column in columns" :class="alignCls(column, row) "  >
              <div class="ivu-table-cell"  ><span v-html="row[column.key]"></span></div>
            </td>
          </tr>

          <tr class="ivu-table-cell" v-show="(!data || data.length === 0)">
            <td class="ivu-table-td-clear"   v-for="column in columns">
              <div class="ivu-table-cell" ><span></span></div>
            </td>
          </tr>
          </tbody>
        </table>


      </div>

       <div v-show="(!data || data.length === 0)" class="ivu-table-body" ref="body" @scroll="handleBodyScroll" style=" height: 550px;" >

       <table cellspacing="0" align="center" cellpadding="0" border="0" :style="bstyles">
        <colgroup>
            <col  :width="width">
          </colgroup>
                    <tbody class="ivu-table-tbody">
                        <tr class="ivu-table-cell">
                            <td class="ivu-table-td-clear" style="text-align: center">
                             <div class="ivu-table-cell" >    <span>暂无数据</span></div>
                               
                            </td>
                        </tr>
                    </tbody>
                </table>


      </div>


    </div>

  </div>

</template>

<script>

  import Csv from './csv.js';
  import ExportCsv from './export-csv.js';

  export default {
    name: 'fastTable',
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      columns: {
        type: Array,
        default() {
          return [];
        }
      },
      width: {
        type: [Number, String]
      },
      addWidth: {
        type: [Number, String]
      },
      bwidth: {
        type: [Number, String]
      },
      height: {
        type: [Number, String]
      },
      isDouble: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        sortById: true,
        cloneColumns: this.makeColumns(),
        rebuildData: []  // for sort or filter

      };
    },
    computed: {
      styles() {
        const style = {};
        const width = this.width;
        style.width = `${width}px`;
        return style;
      },
      bstyles() {
        const style = {};
        const bwidth = this.bwidth;
        style.width = `${bwidth}px`;
        return style;
      }
    },

    watch: {
      data: {
        handler() {
          if (this.sortById) {
            this.cloneColumns.forEach((col) => col._sortType = 'normal');
          }

        }
      },
      columns: {
        handler() {

          this.cloneColumns = this.makeColumns();

        }
      }
    },

    methods: {

      alignCls(column, row = {}) {
        let cellClassName = '';
        if (row.cellClassName && column.key && row.cellClassName[column.key]) {
          cellClassName = row.cellClassName[column.key];
        }
        return [
          {
            [`${cellClassName}`]: cellClassName,    // cell className
            [`${column.className}`]: column.className,    // column className
            [`ivu-table-column-${column.align}`]: column.align
          }
        ];
      },

      exportCsv(params) {
        if (params.filename) {
          if (params.filename.indexOf('.csv') === -1) {
            params.filename += '.csv';
          }
        } else {
          params.filename = 'table.csv';
        }

        let columns = [];
        let datas = [];
        if (params.columns && params.data) {
          columns = params.columns;
          datas = params.data;
        } else {
          columns = this.columns;
          datas = this.data;
          //  if (!('original' in params)) params.original = true;
          //  datas = params.original ? this.data : this.rebuildData;
        }

        let noHeader = false;
        if ('noHeader' in params) noHeader = params.noHeader;

        const data = Csv(columns, datas, ',', noHeader);
        ExportCsv.download(params.filename, data);
      },

      setCellWidth(column, index, top) {
        let width = '';
        if (column.width) {
          width = column.width;
        } else if (this.columnsWidth[column._index]) {
          width = this.columnsWidth[column._index].width;
        }
        // when browser has scrollBar,set a width to resolve scroll position bug
        if (this.columns.length === index + 1 && top && this.$parent.bodyHeight !== 0) {

          if (this.addWidth == 0) {
          } else {
            width += 20;
          }

        }
        // when fixed type,reset first right fixed column's width
        if (this.fixed === 'right') {
          const firstFixedIndex = this.columns.findIndex((col) => col.fixed === 'right');
          if (firstFixedIndex === index) width += this.$parent.scrollBarWidth;
        }
        return width;
      },

      renderHeader(column, $index) {
        if ('renderHeader' in this.columns[$index]) {
          return this.columns[$index].renderHeader(column, $index);
        } else {
          return column.title || '#';
        }
      },

      sortData(data, type, index) {
        const key = this.cloneColumns[index].key;
        data.sort((a, b) => {
          if (this.cloneColumns[index].sortMethod) {
            return this.cloneColumns[index].sortMethod(a[key], b[key], type);
          } else {
            if (type === 'asc') {
              return a[key] > b[key] ? 1 : -1;
            } else if (type === 'desc') {
              return a[key] < b[key] ? 1 : -1;
            }
          }
        });
        return data;
      },
      handleSort(index, type) {

        this.sortById = false;
        this.cloneColumns.forEach((col) => col._sortType = 'normal');
        this.data = this.sortData(this.data, type, index);

        //  this.rebuildData = this.sortData(this.rebuildData, type, index);
        this.cloneColumns[index]._sortType = type;

        const key = this.cloneColumns[index].key;

        this.$emit('on-sort-change', {
          key: key,
          order: type
        });
        setTimeout(() => {

          this.sortById = true;

        }, 4000);

      },
      handleBodyScroll(event) {
        this.$refs.header.scrollLeft = event.target.scrollLeft;

      },
      makeColumns() {
        var columns = this.columns;


        columns.forEach((column, index) => {
          column._sortType = 'normal';
        });
        return columns;
      }


    }
  }
</script>

<style>


  .ivu-table .ivu-table-td-clear {
    border-bottom: 0px solid #e3e8ee !important;
    border-right: 0px solid #e3e8ee !important;
  }

  .inlineBlock {
    display: inline-block !important;
  }


</style>


