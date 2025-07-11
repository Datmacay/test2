<template>
  <table class="user-table">
    <thead>
      <tr>
        <th>User</th>
        <th>Country</th>
        <th>Usage</th>
        <th>Payment Method</th>
        <th>Activity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.name">
        <td class="user-cell">
          <img :src="user.avatar" alt="avatar" />
          <span>{{ user.name }}</span>
        </td>
        <td>
          <img :src="user.flag" alt="flag" width="24" />
        </td>
        <td>
          <div class="usage-bar">
            <div class="fill" :style="{ width: user.usage + '%'}"></div>
            <span>{{ user.usage }}%</span>
          </div>
        </td>
        <td>
          <i :class="user.payment"></i>
        </td>
        <td>{{ user.activity }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const users = [
  {
    name: 'Yasmin Amaru',
    avatar: 'https://i.pravatar.cc/40?img=1',
    flag: 'https://flagcdn.com/w40/us.png',
    usage: 90,
    payment: 'fab fa-cc-visa',
    activity: 'Visited app'
  },
  {
    name: 'Austin Torres',
    avatar: 'https://i.pravatar.cc/40?img=2',
    flag: 'https://flagcdn.com/w40/br.png',
    usage: 22,
    payment: 'fab fa-cc-mastercard',
    activity: 'Used mobile app'
  },
  {
    name: 'Eveline Santos',
    avatar: 'https://i.pravatar.cc/40?img=3',
    flag: 'https://flagcdn.com/w40/fr.png',
    usage: 56,
    payment: 'fab fa-cc-paypal',
    activity: 'Last month'
  },
  {
    name: 'Fredrik Didrik',
    avatar: 'https://i.pravatar.cc/40?img=4',
    flag: 'https://flagcdn.com/w40/de.png',
    usage: 34,
    payment: 'fab fa-cc-amex',
    activity: 'Last week'
  }
]
</script>

<style scoped>
.user-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    background: #f1f1f1;
    padding: 12px;
  }

  td {
    padding: 12px;
    vertical-align: middle;
  }

  .user-cell {
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
      margin-right: 10px;
    }
  }

  .usage-bar {
    background: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    height: 20px;
    width: 100%;

    .fill {
      height: 100%;
      background: #42a5f5;
    }

    span {
      margin-left: 8px;
    }
  }
}
</style>

<!-- Note: Font Awesome icons used -->
