<template>
  <div class="field-group">
    <label :for="id" class="field-group__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      class="field-group__input"
      @input="$emit('input', $event.target.value)"
    />
    <span v-if="hasError" class="field-group__feedback">{{ errorMsg }}</span>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      requred: true,
    },
    label: {
      type: String,
      requred: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      required: false,
    },
    value: {},
    hasError: {
      type: Boolean,
      required: false,
      default: false,
    },
    errorMsg: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.field-group {
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.23;

  &__label {
    margin-bottom: 2px;
  }

  &__input {
    padding: 0;
    border: none;
    outline: none;
    background: none;
    color: $dark-gray;
  }

  &__feedback {
    color: #d40000;
    font-size: 0.8em;
  }
}
</style>
