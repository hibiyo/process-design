<template>
  <a-form-model
    ref="refForm"
    :model="formData"
    :rules="rules"
    :label-col="{span: 7}"
    :wrapper-col="{span: 17}"
  >
    <a-collapse v-model="activeName" accordion>
      <a-collapse-panel key="1" header="基本设置">
        <a-form-model-item label="节点ID" prop="id">
          <a-input v-model="formData.id" allow-clear />
        </a-form-model-item>
        <a-form-model-item label="节点名称" prop="name">
          <a-input v-model="formData.name" allow-clear />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-textarea v-model="formData.documentation" :rows="3" allow-clear />
        </a-form-model-item>
        <a-form-model-item v-if="!!showConfig.taskCategory" label="任务分类" prop="taskCategory">
          <a-select v-model="formData.category">
            <a-select-option
              v-for="(item, index) in this.taskCategory"
              :key="index"
              :value="item.id"
            >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-if="!!showConfig.conditionExpression" label="流转条件" prop="conditionExpression">
          <a-input v-model="formData.conditionExpression" allow-clear />
        </a-form-model-item>
        <a-form-model-item v-if="!!showConfig.async" label="异步" prop="async">
          <a-switch v-model="formData.async" />
        </a-form-model-item>
      </a-collapse-panel>
      <a-collapse-panel v-if="!!showConfig.candidate" key="2" header="候选配置">
        <a-form-model-item v-if="!!showConfig.initiator" label="创建者" prop="initiator">
          <a-input v-model="formData.initiator" allow-clear />
        </a-form-model-item>
        <a-form-model-item v-if="!!showConfig.assignee" label="执行人">
          <a-input v-model="formData.assignee" allow-clear />
        </a-form-model-item>
        <a-form-model-item v-if="!!showConfig.candidateUsers" label="候选用户">
          <a-input v-model="formData.candidateUsers" allow-clear />
        </a-form-model-item>
        <a-form-model-item v-if="!!showConfig.candidateGroups" label="候选组">
          <a-input v-model="formData.candidateGroups" allow-clear />
        </a-form-model-item>
      </a-collapse-panel>
      <a-collapse-panel v-if="!!showConfig.form" key="3" header="表单配置">
        <a-form-model-item v-if="!!showConfig.formKey" label="表单Key">
          <a-input v-model="formData.formKey" allow-clear />
        </a-form-model-item>
        <a-form-model-item v-if="!!showConfig.buttons" label="按钮">
          <a-input v-model="formData.buttons" allow-clear />
        </a-form-model-item>
      </a-collapse-panel>
    </a-collapse>
  </a-form-model>
</template>

<script>
import mixinPanel from '../mixins/mixinPanel'

export default {
  name: 'BpmnNode',
  mixins: [mixinPanel],
  props: {
    taskCategory: {
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
    }
  },
  watch: {
    'formData.initiator': function (val) {
      this.updateProperty('initiator', val, true)
    },
    'formData.category': function (val) {
      this.updateProperty('category', val, true)
    },
    'formData.formKey': function (val) {
      this.updateProperty('formKey', val, true)
    },
    'formData.buttons': function (val) {
      this.updateProperty('buttons', val, true)
    },
    'formData.async': function (val) {
      this.updateProperty('async', val, true)
    },
    'formData.conditionExpression': function (val) {
      if (val) {
        const newCondition = this.modeler.get('moddle').create('bpmn:FormalExpression', { body: val })
        this.updateProperties({ conditionExpression: newCondition })
      } else {
        this.updateProperties({ conditionExpression: null })
      }
    },
    'formData.skipExpression': function (val) {
      this.updateProperty('skipExpression', val, true)
    },
    'formData.assignee': function (val) {
      this.updateProperty('assignee', val, true)
    },
    'formData.candidateUsers': function (val) {
      this.updateProperty('candidateUsers', val, true)
    },
    'formData.candidateGroups': function (val) {
      this.updateProperty('candidateGroups', val, true)
    },
    'formData.dueDate': function (val) {
      this.updateProperty('dueDate', val, true)
    },
    'formData.priority': function (val) {
      this.updateProperty('priority', val, true)
    },
    'formData.isForCompensation': function (val) {
      this.updateProperty('isForCompensation', val)
    },
    'formData.triggerable': function (val) {
      this.updateProperty('triggerable', val, true)
    },
    'formData.class': function (val) {
      this.updateProperty('class', val, true)
    },
    'formData.autoStoreVariables': function (val) {
      this.updateProperty('autoStoreVariables', val, true)
    },
    'formData.exclude': function (val) {
      this.updateProperty('exclude', val, true)
    },
    'formData.ruleVariablesInput': function (val) {
      this.updateProperty('ruleVariablesInput', val, true)
    },
    'formData.rules': function (val) {
      this.updateProperty('rules', val, true)
    },
    'formData.resultVariable': function (val) {
      this.updateProperty('resultVariable', val, true)
    }
  },
  created () {
    const data = {
      ...this.element.businessObject,
      ...this.element.businessObject.$attrs,
    }
    data.documentation = this.getDocumentation()
    data.conditionExpression = this.element.businessObject.conditionExpression?.body
    this.formData = data
  },
  methods: {

  }
}
</script>

<style lang='less'>
</style>
