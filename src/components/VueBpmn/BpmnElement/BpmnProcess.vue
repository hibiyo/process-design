<template>
  <div>
    <a-form-model
      ref="refForm"
      :model="formData"
      :rules="rules"
      :label-col="{span: 7}"
      :wrapper-col="{span: 17}"
    >
      <a-collapse v-model="activeName" accordion>
        <a-collapse-panel key="1" header="基本设置">
          <a-form-model-item label="流程主键" prop="id">
            <a-input v-model="formData.id" allow-clear />
          </a-form-model-item>
          <a-form-model-item label="流程名称" prop="name">
            <a-input v-model="formData.name" allow-clear />
          </a-form-model-item>
          <a-form-model-item label="流程描述">
            <a-textarea v-model="formData.documentation" :rows="3" allow-clear />
          </a-form-model-item>
          <a-form-model-item label="流程分类" prop="processCategory">
            <a-select v-model="formData.processCategory">
              <a-select-option
                v-for="(item, index) in this.processCategory"
                :key="index"
                :value="item.id"
              >{{ item.name }}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="候选配置">
          <a-form-model-item label="可发起者">
            <a-input v-model="formData.candidateStarterUsers" allow-clear />
          </a-form-model-item>
          <a-form-model-item label="可发起组">
            <a-input v-model="formData.candidateStarterGroups" allow-clear />
          </a-form-model-item>
        </a-collapse-panel>
        <!-- <a-collapse-panel key="3" header="监听器">
          <a-form-model-item label="执行监听">
            <a-badge :count="executionListenerLength">
              <a-button @click="executionListenerDrawer = true">编辑</a-button>
            </a-badge>
          </a-form-model-item>
        </a-collapse-panel>-->
      </a-collapse>
    </a-form-model>
  </div>
</template>

<script>
import mixinPanel from '../mixins/mixinPanel'

export default {
  name: 'BpmnProcess',
  mixins: [mixinPanel],
  props: {
    processCategory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeName: '1',
      formData: {},
      rules: {
        id: [
          { required: true, message: '该项不能为空', trigger: 'change' },
        ],
        name: [
          { required: true, message: '该项不能为空', trigger: 'change' },
        ]
      }
      // executionListenerDrawer: false,
      // executionListenerLength: 0
    }
  },
  watch: {
    'formData.processCategory': function (val) {
      if (val === '') {
        val = null
      }
      this.element.businessObject.$parent.targetNamespace = val
    },
    'formData.candidateStarterUsers': function (val) {
      this.updateProperty('candidateStarterUsers', val, true)
    },
    'formData.candidateStarterGroups': function (val) {
      this.updateProperty('candidateStarterGroups', val, true)
    }
  },
  created () {
    const data = {
      ...this.element.businessObject,
      ...this.element.businessObject.$attrs,
    }
    const targetNamespace = this.element.businessObject.$parent.targetNamespace
    data.processCategory = targetNamespace
    data.documentation = this.getDocumentation()

    this.formData = data

    // 监听器相关
    // this.executionListenerLength = this.element.businessObject.extensionElements?.values
    // .filter(item => item.$type === (this.descriptorPrefix + 'ExecutionListener')).length ?? 0
  },
  methods: {
    // 监听器函数（暂弃）
    // changeExecutionListenerDrawer (v) {
    //   this.executionListenerDrawer = v;
    // },
    // saveExecutionListener (v) {
    //   this.executionListenerLength = v
    // }
  }
}
</script>

<style lang='less'>

</style>
