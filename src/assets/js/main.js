//EndPoint - Presidentes
const endpoint_presidentes = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/BR/2022802018/1/candidatos';
//EndPoint - Governadores
const endpoint_governadores = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/MT/2022802018/3/candidatos';
//EndPoint - Governadores
const endpoint_senadores = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/MT/2022802018/5/candidatos';
//EndPoint - Dep Federal
const endpoint_depfederal = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/MT/2022802018/6/candidatos';
//EndPoint - Dep Estadual
const endpoint_depestadual = 'http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2018/MT/2022802018/7/candidatos';




const app = new Vue({
  el: '#app',
  data: {
    candidatos: [],
    presidentes: [],
    governadores: [],
    senadores: [],
    depfederal: [],
    depestadual: [],
    configs: {
      orderPartido: 'partido.sigla',
      porCargo: '',
      orderBy: 'nomeUrna',
      order: 'asc',
      filter: '',
      filterPartido: ''
      
    }
  },

  methods: {
    detalhesCandidato(id){
      fetch("http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2018/BR/2022802018/candidato/" + id, {

      })
      .then(response => {
        console.log(response);
      })
    }

  },
  mounted() {
  	axios.get(endpoint_presidentes).then(response => response.data).then(data => Vue.set(this, 'presidentes', data.candidatos));
    axios.get(endpoint_governadores).then(response => response.data).then(data => Vue.set(this, 'governadores', data.candidatos));
    axios.get(endpoint_senadores).then(response => response.data).then(data => Vue.set(this, 'senadores', data.candidatos));
    axios.get(endpoint_depfederal).then(response => response.data).then(data => Vue.set(this, 'depfederal', data.candidatos));
    axios.get(endpoint_depestadual).then(response => response.data).then(data => Vue.set(this, 'depestadual', data.candidatos));
   },

  computed: {
      //Lista todos candidatos
      listaTodos() {
        const filter = this.configs.filter;
        const filterPartido = this.configs.filterPartido;
        const porCargo = this.configs.porCargo;

        const list = _.orderBy(this.presidentes, this.configs.orderBy, this.configs.order);
        const list2 = _.orderBy(this.governadores, this.configs.orderBy, this.configs.order);
        const list3 = _.orderBy(this.senadores, this.configs.orderBy, this.configs.order);   
        const list4 = _.orderBy(this.depfederal, this.configs.orderBy, this.configs.order);   
        const list5 = _.orderBy(this.depestadual, this.configs.orderBy, this.configs.order);    
   


        //Presidentes
        if(porCargo == 1 && filter == null){
          return list;
         }else if(porCargo == 1 && filter !== null && filterPartido != null){
          return _.filter(list, candidato => candidato.nomeUrna.toLowerCase().indexOf(this.configs.filter.toLowerCase()) >= 0);
        }

        //Governadores
        if(porCargo == 2 && filter == null){
          return list2;
         }else if(porCargo == 2 && filter !== null && filterPartido != null){
          return _.filter(list2, candidato => candidato.nomeUrna.toLowerCase().indexOf(this.configs.filter.toLowerCase()) >= 0);
        }

         //Senadores
        if(porCargo == 3 && filter == null){
          return list3;
         }else if(porCargo == 3 && filter !== null && filterPartido != null){
          return _.filter(list3, candidato => candidato.nomeUrna.toLowerCase().indexOf(this.configs.filter.toLowerCase()) >= 0);
        }

         //Dep Federal
        if(porCargo == 4 && filter == null){
          return list4;
         }else if(porCargo == 4 && filter !== null && filterPartido != null){
          return _.filter(list4, candidato => candidato.nomeUrna.toLowerCase().indexOf(this.configs.filter.toLowerCase()) >= 0);
        }

         //Dep Estadual
        if(porCargo == 5 && filter == null){
          return list5;
         }else if(porCargo == 5 && filter !== null && filterPartido != null){
          return _.filter(list5, candidato => candidato.nomeUrna.toLowerCase().indexOf(this.configs.filter.toLowerCase()) >= 0);
        }


        

      },

  
    //Retorna partidos únicos
     partidosUnicos(){
        return _.uniq(this.presidentes.map(c => c.partido.sigla));
     }
 
  },
});