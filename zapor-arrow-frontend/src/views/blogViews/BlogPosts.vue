<template>
<v-content class="blog-container">
    <app-nav-bar header-title="Blogom"></app-nav-bar>
    <v-row style="padding-bottom:200px">
        <v-col cols="2" class="hidden-md-and-down ">
            <ul class="navbar-nav">
            <p class="nav-header">Témák:</p>
                <li class="nav-item">
                    <a  @click.stop="selectedCategory = ''">Összes téma</a>
                </li>
                <li v-for="(category,index) in categories" :key="index"
                    class="nav-item">
                    <a @click="selectedCategory = category">{{ category }}</a>
                </li>
            </ul>
        </v-col>
        <v-col class="col" sm="12" md="12"  lg="8" offset-lg="1" >
            <v-select :items="Array.from(categories)"
                        v-model="selectedCategory"
                        outlined
                        clearable
                        clear-icon="X"
                        label="Téma"
                        class="drop-select hidden-md-and-up"
            ></v-select>
        <div class="masonry">
            <div v-for="(post, key) in filteredPosts"
                :key="key"
                class="card" >
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
    <app-footer></app-footer>
</v-content>
</template>

<script>
    import firebase from './../../firebaseInit'
    const db = firebase.firestore();
    
    import NavBar from './../../components/NavBar.vue'
    import Footer from './../../components/Footer'
    
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
            appNavBar:NavBar,
            appFooter: Footer
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
                let grid = document.getElementsByClassName('masonry')[0],
                    rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
                    rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));


                let rowSpan = Math.ceil((item.querySelector('.card-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

                item.style.gridRowEnd = 'span ' + rowSpan;
            },
            resizeAllMasonryItems () {
                let allItems = document.getElementsByClassName('card');

                for (let i = 0; i < allItems.length; i++) {
                    this.resizeMasonryItem(allItems[i]);
                }
            }
        }
    }
</script>

<style scoped>
    .blog-container{
        height: 100%;
    }
    .masonry {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: 0;
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
        height: 100%;
        width: 100%;
        display: table;
    }

    .card-content{
        text-align: center;
    }
/* /-----------------------------navbar------------------------/ */
    .nav-header{
        text-align: center;

    }
    .navbar{
        width: 10rem;
        height: 100vh;
        position: relative;

    }
    .navbar-nav{
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        text-transform: uppercase;
        font-family: 'bookAntiqua';
        font-weight: 700;
        font-size: 20px;
        color: tomato;
        height: 100%;
        width: 100%;
    }

    .nav-item a{
        text-decoration: none;
        color: brown;
    }

    .drop-select{
        padding: 8px;
    }
    
</style>>
