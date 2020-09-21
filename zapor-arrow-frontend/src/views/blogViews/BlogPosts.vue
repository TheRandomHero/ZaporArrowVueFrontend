<template>
<v-container fluid class="blog-container">

    <app-nav-bar header-title="Blogom"></app-nav-bar>
    <v-row>
        <v-col cols="2">
                <p>Témák:</p>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a  @click.stop="selectedCategory = ''">Összes téma</a> </li>
                    <li v-for="(category,index) in categories" :key="index"
                        class="nav-item">
                        <a @click="selectedCategory = category">{{ category }}</a>
                    </li>
                </ul>

        </v-col>
        <v-col class="col" >
        <div class="masonry">
            <div v-for="(post, key) in filteredPosts"
                :key="key"
                class="card"
                
            >
                <div class="card-content">
                    <div v-if="post.imageUrl != ''">
                        <img :src="post.imageUrl" :alt="post.title" class="img-responsive" @load="rendered">
                    </div>
                    <div class="p-20">
                        <h3>
                            <a @click="$router.push({name:'viewBlogPost', params:{id : post.id}})">{{ post.title }}</a>
                        </h3>
                            <a>{{post.category}}</a>
                        <p>{{ post.date}}</p>
                    </div>
                </div>
            </div>
        </div>
        </v-col>    
    </v-row>
</v-container>
</template>

<script>
    import firebase from './../../firebaseInit'
    const db = firebase.firestore();
    
    import NavBar from './../../components/NavBar.vue'
    
    export default {
        
        data () {
            return {
                posts: [],
                categories:[],
                selectedCategory:'',
                imageCounter: 0,
                imagesCount: 0
            }
        },
        components:{
            appNavBar:NavBar
        },
        mounted () {
            this.getPosts()
        },
        created () {
            let masonryEvents = ['load', 'resize'];
            let vm = this
            vm.resizeAllMasonryItems()
            masonryEvents.forEach(function (event) {
                window.addEventListener(event, vm.resizeAllMasonryItems);
            });
        },
        updated(){
            this.resizeAllMasonryItems()
        },
        watch: {
            imagesCount: function () {
                if(this.imagesCount == this.imageCounter){
                    this.resizeAllMasonryItems()
                }
            }
        },
        computed:{
            filteredPosts(){
                return this.posts.filter((post) =>{
                    return post.category.match(this.selectedCategory)
                })
            }
        },
        methods: {
            rendered () {
                this.imagesCount++
            },
            getPosts () {
                db.collection('blogs').orderBy('date', 'desc').get()
                .then(snap =>{
                    const tempCat = new Set()
                    snap.forEach(doc =>{
                        const data = {
                            'id':doc.id,
                            'title':doc.data().title,
                            'context':doc.data().context,
                            'date': doc.data().date,
                            'imageUrl': doc.data().imageUrl,
                            'category': doc.data().category
                        }
                        tempCat.add(doc.data().category)
                        this.posts.push(data)
                    })
                    this.categories = tempCat
                })
            },
            calculateImageCount () {
                for (let i = 0; i < this.posts.length; i++) {
                    if (this.posts[i].media.featured.medium != '') {
                        this.imageCounter++
                    }
                }
            },
            resizeMasonryItem (item) {
                /* Get the grid object, its row-gap, and the size of its implicit rows */
                let grid = document.getElementsByClassName('masonry')[0],
                    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
                    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

                /*
                 * Spanning for any brick = S
                 * Grid's row-gap = G
                 * Size of grid's implicitly create row-track = R
                 * Height of item content = H
                 * Net height of the item = H1 = H + G
                 * Net height of the implicit row-track = T = G + R
                 * S = H1 / T
                 */

                let rowSpan = Math.ceil((item.querySelector('.card-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

                /* Set the spanning as calculated above (S) */
                item.style.gridRowEnd = 'span ' + rowSpan;
            },
            resizeAllMasonryItems () {
                // Get all item class objects in one list
                let allItems = document.getElementsByClassName('card');

                /*
                 * Loop through the above list and execute the spanning function to
                 * each list-item (i.e. each masonry item)
                 */
                for (let i = 0; i < allItems.length; i++) {
                    this.resizeMasonryItem(allItems[i]);
                }
            }
        }
    }
</script>

<style type="text/css">

    .col{
        display: block;
    }
    .blog-container{
        padding: 0;
    }
    .masonry {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: 0;
        grid-gap: 15px;
        margin-right: 5rem;
    }
    .img-responsive{
        max-width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
    }
    .card{
        box-sizing: border-box;
        box-shadow: 0 0 10px 3px #e4e4e4;
    }

    .card-content{
        text-align: center;
    }
/* /-----------------------------navbar------------------------/ */
    .navbar{
        width: 10rem;
        height: 100vh;
        position: relative;
        background: fuchsia;

    }
    .navbar-nav{
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
    }

    .nav-item{
        width: 100%;
        font-family: 'twang';
        text-transform: uppercase;
        font-size: 20px;
    }
</style>