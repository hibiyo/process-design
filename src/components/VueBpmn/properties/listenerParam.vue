<template>
  <a-drawer :title="title" :visible.sync="_listenerParamsDrawer" placement="right" @open="init">
    <div style="padding: 10px;">
      <a-table
        ref="listenerParamsRef"
        :columns="columns"
        :data-source="listenerParamsInner"
        bordered
      >
        <template slot="listenerType" slot-scope="scope">
          <span>{{ paramType[scope.row.paramType] }}</span>
        </template>
        <template slot="action" slot-scope="{row}">
          <a-button icon="delete" @click.native.stop="deleteListenerParam(row)" />
        </template>
      </a-table>
      <div v-if="showForm">
        <a-divider></a-divider>
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          @submit="handleSubmit"
        >
          <a-form-item label="名称">
            <a-input v-decorator="['name']" />
          </a-form-item>
          <a-form-item label="类型">
            <a-select v-decorator="['paramType']" placeholder="请选择">
              <a-select-option
                v-for="item in paramTypes"
                :key="item.value"
                :value="item.value"
              >{{ item.label }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="值">
            <a-input v-decorator="['value']" />
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div style="text-align:right;padding: 10px;">
      <a-button icon="plus" type="primary" @click="addListenerParam">添加</a-button>
      <a-button icon="close" @click="_listenerParamsDrawer = false">取消</a-button>
      <a-button icon="check" type="primary" @click="save">确定</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { randomString } from '@/utils/util'

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '类型',
    dataIndex: 'paramType',
    key: 'paramType',
    scopedSlots: { customRender: 'paramType' },
    align: 'center'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center'
  }
]

export default {
  props: {
    listenerParamsDrawer: {
      type: Boolean,
      default: false
    },
    listenerParams: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  watch: {
    listenerParams (newVal) {
      this.listenerParamsInner = newVal;
    }
  },
  computed: {
    _listenerParamsDrawer: {
      get () {
        return this.listenerParamsDrawer
      },
      set (v) {
        // this.init()
        this.$emit("changeListenerParamsDrawer", v)
      }
    }
  },
  data () {
    return {
      columns,
      listenerParamsInner: [],
      paramType: {
        string: '字符串',
        expression: '表达式'
      },
      paramTypes: [
        { value: 'string', label: '字符串' },
        { value: 'expression', label: '表达式' }
      ],
      listenerParam: {
        id: '',
        name: '',
        paramType: 'string',
        value: ''
      },
      showForm: false
    }
  },
  created () {

  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.listenerParamsInner = [... this.listenerParams]
      this.showForm = false
      this.listenerParam = {
        id: '',
        name: '',
        paramType: 'string',
        value: ''
      }
    },
    addListenerParam () {
      this.showForm = true
      let val = {
        id: randomString(),
        name: '',
        paramType: 'string',
        value: ''
      }
      this.listenerParamsInner.push(val)
      this.listenerParam = val
      this.$refs['listenerParamsRef'].setCurrentRow(val, true)
    },
    deleteListenerParam (row) {
      let index = this.listenerParamsInner.indexOf(row)
      this.listenerParamsInner.splice(index, 1)
      this.showForm = false
    },
    editListenerParam (row) {
      this.showForm = true
      this.listenerParam = row
    },
    save () {
      this._listenerParamsDrawer = false
      this.$emit("saveListenerParams", this.listenerParamsInner)
    }
  }
}
</script>

<style lang='less'>
</style>
