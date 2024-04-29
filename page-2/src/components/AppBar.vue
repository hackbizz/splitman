<template>
  <v-app-bar class="header" app :elevation="1">
    <v-app-bar-nav-icon
      @click.stop="$emit('toggleDrawer')"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>SplitMan</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-text-field
      :value="search"
      label="Search..."
      hide-details
      append-icon="mdi-magnify"
      @click:append="searchItems"
      class="search-field"
      outlined
    ></v-text-field>
    <v-spacer></v-spacer>

    <!-- <v-btn
            v-if="!isCreateGroupButtonHidden && !isMenuHidden"
            variant="outlined"
            elevation="4"
            color="purple-darken-4"
            class="create-group-btn"
            @click="openCreateGroupDialog"
        >
            <v-icon left color="purple-darken-4">mdi-plus</v-icon>
            Create New Group
        </v-btn> -->

    <CreateGroupForm
      :isCreateGroupButtonHidden="isCreateGroupButtonHidden"
      :isMenuHidden="isMenuHidden"
      :windowWidth="windowWidth"
      @groupCreated="$emit('groupCreated')"
    />
    <!-- <v-btn
            v-else-if="!isMenuHidden"
            icon
            class="profile-avatar"
            @click="openCreateGroupDialog"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn> -->

    <v-spacer></v-spacer>

    <v-btn v-if="!isMenuHidden" icon class="profile-avatar" size="47">
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <!-- <v-spacer></v-spacer> -->

    <v-menu v-if="!isMenuHidden">
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar class="profile-avatar" size="42">
            <img src="https://picsum.photos/536/354" alt="Profile Image" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="handleProfileClick">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Profile</v-list-item-content>
        </v-list-item>
        <v-list-item @click="handleLogoutClick">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <span class="username">{{ username }}</span>
    <!-- <v-spacer></v-spacer> -->

    <!-- Dropdown menu for Create Group, Notification, and Profile -->
    <v-menu
      bottom
      left
      offset-y
      v-if="isMenuHidden"
      @openCreateGroupDialog="openCreateGroupDialog"
    >
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          @click="openCreateGroupDialog, $emit('openCreateGroupDialog')"
        >
          <!-- <template v-slot:activator="{ activatorProps }"> -->
          <!-- <v-list-item-icon>
                        <v-icon>mdi-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>Create New Group</v-list-item-content> -->
          <!-- </template> -->
          <CreateGroupForm
            @groupCreated="$emit('groupCreated')"
            @successToast="$emit('succesToast')"
            @errorToast="$emit('errorToast')"
          />
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-bell</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Notifications</v-list-item-content>
        </v-list-item>
        <v-list-item @click="handleProfileClick">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Profile</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-spacer></v-spacer>

    <!-- <CreateGroupForm :dialog="createGroupDialogVisible" @closeDialog="createGroupDialogVisible = false" /> -->
    <!-- 
        <create-group-form 
            :dialog="createGroupDialogVisible"
            @groupCreated="handleGroupCreated"
        ></create-group-form> -->
  </v-app-bar>
</template>

<script>
import CreateGroupForm from "./CreateGroupForm.vue";

export default {
  name: "AppBar",
  components: {
    CreateGroupForm,
  },
  data() {
    return {
      createGroupDialog: false,
    };
  },
  props: [
    "search",
    "isCreateGroupButtonHidden",
    "isMenuHidden",
    "username",
    "windowWidth",
    "drawer",
  ],
  methods: {
    updateSearch(value) {
      // Emit an event to update search in parent component
      this.$emit("update:search", value);
    },
    searchItems() {
      // Emit an event to update search in parent component
      // this.$emit('update:search', this.search);
      this.updateSearch(this.search);
      // console.log('Searching for: ', this.search)
    },
    handleProfileClick() {
      // Here you can define the actions to be performed when the Profile option is clicked
      console.log("Profile clicked");
      // this.$router.push('/profile');
    },
    handleLogoutClick() {
      // Here you can define the actions to be performed when the Logout option is clicked
      console.log("Logout clicked");
      // this.$store.dispatch('logout');
      // this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.search-field {
  width: 300px; /* Adjust width as needed */
  /* border: 1px solid #a32323; Border color and thickness */
  border-radius: 8px; /* Border radius */
}

.create-group-btn {
  margin-right: 16px;
}

.profile-avatar {
  margin-right: 10px; /* Adjust margin as needed */
  margin-left: 16px;
  border: 3px solid #673ab7;
}

/* .appbar {
  background-color: #e7d3eb;
  display: flex;
} */

/* media queries */
.header {
  display: flex;
}

.username {
  font-size: x-large;
  @media (max-width: 896px) {
    display: none;
  }
}
</style>
