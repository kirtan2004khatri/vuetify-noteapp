<template>
  <v-app>
    <v-app-bar class="blue" app>
      <v-toolbar-title class="white--text font-weight-bold">MyApp</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text class="white--text">Photos</v-btn>
      <v-btn text class="white--text">Videos</v-btn>
      <v-btn text class="white--text" router to="/notes">Notes</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer color="blue">
      <span class="white--text d-block mx-auto py-1">MyApp @ 2022</span>
    </v-footer>
  </v-app>
</template>

