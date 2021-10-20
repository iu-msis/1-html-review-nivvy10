const SomeApp = {
  data() {
    return {
      books: [],
      selectedBook: null,
      bookDetails: [],
      offerForm: {},
    //   selectedOffer: null
    };
  },
  computed: {},
  methods: {
    prettyDollar(n) {
      const d = new Intl.NumberFormat("en-US").format(n);
      return "$ " + d;
    },
    selectBook(s) {
      if (s == this.selectedBook) {
        return;
      }
      this.selectedBook = s;
      this.bookDetails = [];
      this.fetchBookDetails(this.selectedBook);
    },
    fetchBookData() {
      fetch("/api/books/")
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.books = responseJson;
        })
        .catch(err => {
          console.error(err);
        });
    },
    fetchBookDetails(s) {
      console.log("Fetching Book data for ", s);
      fetch("/api/books/?books=" + s.id)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.bookDetails = responseJson;
        })
        .catch(err => {
          console.error(err);
        })
        .catch(error => {
          console.error(error);
        });
    },
    postOffer(evt) {
      console.log("Test:", this.selectedBook);
      if (this.selectedBook) {
        this.postEditOffer(evt);
      } else {
        this.postNewOffer(evt);
      }
    },
    postEditOffer(evt) {
      this.offerForm.id = this.selectedBook.id;
    //   this.offerForm.studentId = this.selectedStudent.id;

      console.log("Editing!", this.offerForm);

      fetch("api/books/update.php", {
        method: "POST",
        body: JSON.stringify(this.offerForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.bookDetails = json;

          // reset the form
          this.resetOfferForm();
        });
    },
    postNewOffer(evt) {
    //   this.offerForm.id = this.selectedBook.id;

      console.log("Creating!", this.offerForm);

      fetch("api/books/create.php", {
        method: "POST",
        body: JSON.stringify(this.offerForm),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;

          // reset the form
          this.resetOfferForm();
        });
    },
    selectOfferToEdit(book) {
      this.selectedBook = book;
      this.offerForm = Object.assign({}, this.selectedBook);
    },
    resetOfferForm() {
      this.selectedBook = null;
      this.offerForm = {};
    }
  },
  created() {
    this.fetchBookData();
    // this.fetchOfferData();
  }
};

Vue.createApp(SomeApp).mount("#offerApp");
