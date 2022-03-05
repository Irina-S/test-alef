<template>
  <form @submit.prevent="saveInfo" class="form">
    <div class="form__section">
      <h2 class="title form__title">Персональные данные</h2>
      <div class="form-group form-group--vert">
        <FieldGroup
          id="userName"
          label="Имя"
          placeholder="Введите имя"
          v-model="user.name"
          :hasError="$v.user.name.$dirty && $v.user.name.$invalid"
          :errorMsg="
            $v.user.age.$invalid && !$v.user.name.required
              ? 'Поле не может быть пустым'
              : ''
          "
        />
        <FieldGroup
          id="userAge"
          type="number"
          label="Возраст"
          placeholder="Введите возраст"
          v-model="user.age"
          :hasError="$v.user.age.$dirty && $v.user.age.$invalid"
          :errorMsg="
            $v.user.age.$invalid && !$v.user.age.required
              ? 'Поле не может быть пустым'
              : `Минимальное значение - ${$v.user.age.$params.minValue.min}`
          "
        />
      </div>
    </div>
    <div class="form__section">
      <div class="form__header">
        <h2 class="title">Дети (макс.{{ childrenCountMax }})</h2>

        <button
          type="button"
          class="button button--secondary"
          :class="{ 'button--hidden': !isAddBtnVisible }"
          @click="addChild"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.13332 10.8556C4.50125 10.8555 3.98887 11.3679 3.98887 12C3.98887 12.6321 4.50126 13.1445 5.13332 13.1445L10.8554 13.1445L10.8554 18.8668C10.8554 19.4989 11.3678 20.0113 11.9999 20.0113C12.632 20.0113 13.1444 19.4989 13.1444 18.8668L13.1443 13.1445L18.8667 13.1445C19.4988 13.1445 20.0112 12.6321 20.0112 12C20.0112 11.3679 19.4988 10.8556 18.8667 10.8556L13.1443 10.8556L13.1443 5.13338C13.1443 4.50132 12.632 3.98893 11.9999 3.98893C11.3678 3.98893 10.8554 4.50131 10.8554 5.13338L10.8554 10.8556L5.13332 10.8556Z"
              fill="#01A7FD"
            />
          </svg>
          Добавить ребенка
        </button>
      </div>
      <div class="form-group form-group--vert">
        <div
          v-for="(child, index) in children"
          :key="child.id"
          class="form-group"
        >
          <FieldGroup
            :id="'childName' + child.key"
            label="Имя"
            placeholder="Введите имя"
            class="flex-grow-2"
            v-model="child.name"
            :hasError="
              $v.children.$each[index].name.$dirty &&
              $v.children.$each[index].name.$invalid
            "
            :errorMsg="
              $v.children.$each[index].name.$dirty &&
              !$v.children.$each[index].name.required
                ? 'Поле не может быть пустым'
                : ''
            "
          />

          <FieldGroup
            :id="'childAge' + child.key"
            type="number"
            label="Возраст"
            placeholder="Введите возраст"
            class="flex-grow-2"
            v-model="child.age"
            :hasError="
              $v.children.$each[index].age.$dirty &&
              $v.children.$each[index].age.$invalid
            "
            :errorMsg="
              $v.children.$each[index].age.$dirty &&
              !$v.children.$each[index].age.required
                ? 'Поле не может быть пустым'
                : `Минимальное значение - ${$v.children.$each[index].age.$params.minValue.min}`
            "
          />

          <button
            type="button"
            class="button button--small"
            @click="removeChild(child.id)"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
    <button class="button">Сохранить</button>
  </form>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators';
import FieldGroup from '@/components/FieldGroup';
export default {
  components: { FieldGroup },
  validations: {
    user: {
      name: { required },
      age: { required, minValue: minValue(0) },
    },
    children: {
      $each: {
        name: { required },
        age: { required, minValue: minValue(0) },
      },
    },
  },
  data: () => ({
    childrenCountMax: 5,
    user: {
      name: null,
      age: null,
    },
    children: [],
  }),
  computed: {
    ...mapState({ savedUser: 'user', savedChildren: 'children' }),

    isAddBtnVisible() {
      return this.children.length < this.childrenCountMax;
    },
  },
  mounted() {
    if (this.savedUser) {
      this.user = this.savedUser;
    }

    if (this.savedChildren) {
      this.children = this.savedChildren;
    }
  },
  methods: {
    ...mapMutations(['setUser', 'setChildren']),
    addChild() {
      const id = this.children.length
        ? this.children[this.children.length - 1].id + 1
        : 0;
      this.children.push({
        id,
        name: null,
        age: null,
      });
    },
    removeChild(id) {
      const index = this.children.findIndex((value) => value.id === id);
      this.children.splice(index, 1);
    },
    saveInfo() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      this.setUser(this.user);
      this.setChildren(this.children);
      this.$router.push({ name: 'preview' });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  &__title {
    margin-bottom: 20px;
  }

  &__section {
    margin-bottom: 30px;
  }

  &-group {
    display: flex;
    gap: 10px 18px;

    &--vert {
      flex-direction: column;
    }
  }
}

.flex-grow-2 {
  flex-grow: 2;
}
</style>
