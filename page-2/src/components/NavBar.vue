<template>
    <v-navigation-drawer app  v-model="this.drawer"> 
      <v-list class="navi-items">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          link to="/"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-box"
          title="Friends"
          link to="/"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group"
          title="Groups"
          link to="/group-list"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-calendar-clock"
          title="Activity"
          link to="/"
        ></v-list-item>
        <v-list-item 
          prepend-icon="mdi-cog" 
          title="Settings"
          link to="/"
          ></v-list-item>
        <v-list-item
          prepend-icon="mdi-logout-variant"
          title="Logout"
          link to="/"
          @click="handleLogoutClick"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'NavBar',
        props:['drawer', 'windowWidth'],
        data() {
            return {
                activeItem: "Dashboard",
            }
        },
        methods: {
            handleLogoutClick() {
                // Here you can define the actions to be performed when the Logout option is clicked
                console.log("Logout clicked");
                // this.$store.dispatch('logout');
                // this.$router.push('/login');
            },
        }
    }
</script>

<style scoped>
.navi-items {
  font-size: 25px;
  margin-top: 40px;
  color: darkgray;
}
.navi-items:hover {
  color: #000000;
}
.navi-items:active {
  color: deepskyblue
}
</style>