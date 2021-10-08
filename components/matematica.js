app.component('matematica', {
    template:
    /*html*/
        `<div class="wrapper">
            <div class="content-wrapper ml-5 mr-5">
                <div class="row mt-5 bg-secondary rounded text-white text-center">
                    <div class="col-md-4 rounded pt-2 pb-2 ">
                        <h3>Tutti i tentativi</h3>
                        <p v-for="tentativa in tentativas">{{ tentativa }}</p>
                    </div>    
                    <div class="col-md-4 rounded pt-2 pb-2 bg-warning">
                        <div class="input-group mb-3">
                            <input type="number" class="form-control" placeholder="Qual tabellina voi imparare?" aria-label="Qual taboada você quer aprender" aria-describedby="basic-addon1" v-model="taboada">
                        </div>
                        <form action="#" @submit.prevent="verifica_resposta">
                            <div class="input-group mb-3" v-show="taboada">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Quanto fa {{ taboada }} x {{ aleatorio }}?</span>
                                </div>
                                <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" required v-model="resposta_inserida">
                            </div>
                            <div class="float-right ml-1">
                                <button type="button" class="btn btn-primary" v-show="taboada" @click="verifica_resposta">Controllare</button>
                            </div>
                        </form>
                        <h6 class="text-dark">{{ menssagem }}</h6>
                    </div>    
                    <div class="col-md-4 rounded pt-2 pb-2 ">
                        <h3>Tuo storico</h3>
                        <p>Tentativi: {{ tentativa }}</p>
                        <p>Successi: {{ acertos }}</p>
                    </div>    
                </div>    
            </div>    
        </div>`,
    data() {
        return {
            taboada: null,
            resposta_inserida: null,
            aleatorio: null,
            tentativas: [],
            tentativa: 0,
            acertos: 0,
            menssagem: null
        }
    },
    methods: {
        gera_aleatorio(){
            this.aleatorio = Math.floor(Math.random() * 10) + 1;
        },
        verifica_resposta(){
            let tentativa = `${this.taboada} X ${this.aleatorio} = ${this.resposta_correta}`
            this.tentativas.push(tentativa)
            this.tentativa += 1
            if(this.resposta_correta == this.resposta_inserida){
                this.acertos += 1
                this.menssagem = this.resposta_inserida + ', complimenti hai acertatto!!'
                this.resposta_inserida = null
                this.gera_aleatorio()
            } else {
                this.menssagem = this.resposta_inserida + ' non è la risposta corretta!!'
                this.resposta_inserida = null
            }
            setTimeout(()=>{
                this.menssagem = null
             },5000);
        }
    },
    watch: {
        taboada(){
            this.gera_aleatorio();
        }
    },
    computed: {
        resposta_correta(){
            return this.taboada * this.aleatorio 
        }

    },
    mounted() {
        this.gera_aleatorio()
    },
})