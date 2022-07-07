<template>
  <v-container fluid class="ma-0 pa-0">
    <v-card elevation="2" class="ma-0 pa-0">
      <v-row no-gutters class="px-5">
        <v-col cols="6" class="pa-0 ma-0 d-flex align-center justify-start">
          <v-container class="pa-0 ma-0" style="width: 15rem">
            <v-text-field
              prepend-icon="mdi-magnify"
              label="Search note title"
            ></v-text-field>
          </v-container>
        </v-col>
        <v-col cols="6" class="d-flex justify-end align-center">
          <v-btn text color="blue" @click="dialog = !dialog">
            <v-icon>mdi-plus-circle</v-icon>
            &nbsp;Add new note
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <v-container fluid class="mx-0 mt-4 pa-0">
      <h3
        class="text-center font-weight-regular grey--text"
        v-if="isEmpty"
        style="margin-top: 10rem"
      >
        Nothing to see here....
      </h3>

      <v-row v-if="!isEmpty" class="mx-2 my-5 pa-3 grey lighten-4 rounded-lg">
        <v-col md="3" v-for="card in paginationArr" :key="card">
          <v-card dark>
            <v-card-title class="text-h6 py-2">{{ card.title }}</v-card-title>
            <v-divider class="white --text"></v-divider>
            <v-card-text class="py-3" style="height:8rem">{{ card.description }}</v-card-text>
            <v-divider class="white --text"></v-divider>
            <v-card-actions class="px-5">
              <v-spacer></v-spacer>
              <v-btn
                fab
                class="white black--text"
                x-small
                elevation="1"
                @click="
                  editData(card.id);
                  dialog = !dialog;
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                fab
                class="white black--text"
                x-small
                elevation="1"
                @click="deleteData(card.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Dialog -->

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>{{ cardTitle }}</v-card-title>
        <v-divider></v-divider>
        <v-container class="px-5">
          <v-text-field
            :label="noteLabel"
            color="blue"
            maxlength="30"
            counter="30"
            v-model="title"
          ></v-text-field>
          <v-textarea
            :label="descripLabel"
            counter="100"
            maxlength="100"
            v-model="descrip"
          ></v-textarea>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-end px-5" v-if="!update">
          <v-btn class="primary white--text" @click="addData">Add</v-btn>
          <v-btn class="secondary white--text" @click="dialog = !dialog"
            >Cancel</v-btn
          >
        </v-card-actions>
        <v-card-actions class="d-flex justify-end px-5" v-if="update">
          <v-btn class="primary white--text" @click="replaceData">Update</v-btn>
          <v-btn class="secondary white--text" @click="dialog = !dialog"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Pagination -->
    <v-pagination v-if="showPagination" :length="totalPages" dark color="blue" v-model="page" circle
    @input="perPageData(page)" ></v-pagination>

  </v-container>
</template>

<script>
import { db, colRef } from "../../src/firebase-config";
import {
  onSnapshot,
  serverTimestamp,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
export default {
  data() {
    return {
      dialog: false,
      title: "",
      descrip: "",
      rows: [],
      isEmpty: true,
      noteLabel: "Enter the note title here.....",
      descripLabel: "Enter the note description here",
      cardTitle: "Add Note",
      tempid: 0,
      update: false,
      totalPages:0,
      page:1,
      showPagination:false,
      paginationArr:[]
    };
  },
  methods: {
    fetchData() {
      let data = [];
      const q=query(colRef,orderBy('createdAt'));
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((e) => {
          data.push({ ...e.data(), id: e.id });
        });
        this.rows = data;this.paginationArr=data
        data.length == 0 ? (this.isEmpty = true) : (this.isEmpty = false);
        this.totalPages=(Math.ceil(this.rows.length/9));
        (this.totalPages>1)?this.showPagination=true:this.showPagination=false;
        this.paginationArr=this.rows.slice((this.page-1)*9,(this.page-1)*9 + 9);
        data = [];
      });
    },
    addData() {
      addDoc(colRef, {
        title: this.title,
        description: this.descrip,
        createdAt: serverTimestamp(),
      })
        .then(() => console.log("Data added successfully........"))
        .catch((err) => console.log(err));
    },
    deleteData(id) {
      const delRef = doc(db, colRef.id, id);
      deleteDoc(delRef)
        .then(() => console.log("Data deleted succesfully........"))
        .catch((err) => console.log(err));
    },
    editData(id) {
      this.tempid = id;
      this.update = true;
      this.cardTitle = "Update Note";
      this.noteLabel = "Enter the updated title";
      this.descripLabel = "Enter the updated description";
    },
    replaceData() {
      const updtRef = doc(db, colRef.id, this.tempid);
      updateDoc(updtRef, {
        title: this.title,
        description: this.descrip,
      })
        .then(() => {
          this.update = false;
          this.cardTitle = "Add Note";
          this.noteLabel = "Enter the note title here";
          this.descripLabel = "Enter the note description here.....";
        })
        .catch((err) => console.log(err));
    },
    perPageData(page){
        this.paginationArr=this.rows.slice((page-1)*9,(page-1)*9 + 9);
        console.log(this.paginationArr);
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
