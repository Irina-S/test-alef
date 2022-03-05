<template>
  <div class="info">
    <div class="info__section">
      <h2 class="title info__title">Персональные данные</h2>

      <div class="info-card">
        {{
          user
            ? `${user.name}, ${user.age} ${declineYear(user.age)}`
            : 'Нет данных'
        }}
      </div>
    </div>

    <div class="info__section">
      <h2 class="title info__title">Дети</h2>

      <ul v-if="children.length > 0" class="list">
        <li
          v-for="child in children"
          :key="child.id"
          class="list__item info-card info-card--child"
        >
          {{
            child
              ? `${child.name}, ${child.age} ${declineYear(child.age)}`
              : 'Нет данных'
          }}
        </li>
      </ul>

      <div v-else class="info-card">Детей нет</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user', 'children']),
  },
  methods: {
    declineYear(age) {
      const years = age % 10;
      const decades = Math.trunc((age % 100) / 10);
      if ((decades === 0 || 2 <= decades) && years === 1) return 'год';
      if ((decades === 0 || 2 <= decades) && 2 <= years && years <= 4)
        return 'года';
      return 'лет';
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  &__title {
    margin-bottom: 20px;
  }

  &__section {
    margin-bottom: 60px;
  }

  &-card {
    font-weight: bold;
    font-size: 16px;
    line-height: 1.5;
    color: $dark-gray;

    &--child {
      padding: 10px 20px !important;
      background: #f1f1f1;
      border-radius: 5px;
    }
  }
}

.list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;

  &__item {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
