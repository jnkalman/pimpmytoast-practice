<template>
<li class="list-group-item" v-for="message in messages">
  <h4 class="list-group-item-heading">
    {{ message.name }}
  </h4>

  <p class="list-group-item-text" v-if="message.description">{{ message.description }}</p>

  <h6><em><small>
    Sent:
    {{ message.date }}
  </em></small></h6>
</li>
</template>
