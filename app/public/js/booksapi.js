const SomeApp = {
    data() {
      return {
        books: [],
        selectedBook: null,
        bookDetails: []
      }
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
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchBookDetails(s) {
            console.log("Fetching offer data for ", s);
            fetch('/api/books/?book=' + s.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.bookDetails = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        }

    },
    created() {
        this.fetchBookData();
        // this.fetchOfferData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');