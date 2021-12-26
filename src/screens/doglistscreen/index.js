import React, { Component } from "react";
import { FlatList, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity,View ,Image} from "react-native";
import SearchInput, { createFilter } from 'react-native-search-filter';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSubDogs,getImgDogs } from '../../actions/dog/index';

const KEYS_TO_FILTERS = ['name'];
class DogListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenTitle: 'DogListScreen',
      searchTerm: '',
    };
  }

  componentDidMount = async() => {
    const {dataDogAll,data} = this.state;
    const {getSubDogs} = this.props;

  }

  componentDidUpdate = async(prevProps, prevState) => {
    const{getSubDogsSuccess,getSubDogsError,getImgDogsSuccess,getImgDogsError} = this.props;
    if (getSubDogsSuccess && prevProps.getSubDogsSuccess !== getSubDogsSuccess) {
        const DATA = [];
        await getSubDogsSuccess.map((data,index) => {
          DATA.push({"id":index,"name":data})
        })
        
        if(DATA.length > 0){
          this.props.navigation.navigate('DogSubListScreen',{data : DATA})
        }
        
    } 
    
    if (getSubDogsError && prevProps.getSubDogsError !== getSubDogsError) {
      console.log(getSubDogsError)
    } 

    if (getImgDogsSuccess && prevProps.getImgDogsSuccess !== getImgDogsSuccess) {
      const DATA = [];
      await getImgDogsSuccess.map((data,index) => {
        const e = data.split('/');
        const imageName = e[5].split('.')
        DATA.push({"id":index,"name":data,"jenis":e[4],imgName:imageName[0]})
      })

      if(DATA.length > 0){
        this.props.navigation.navigate('DogSubListScreen',{data : DATA})
      }
    } 

    if (getImgDogsError && prevProps.getSubDogsError !== getSubDogsError) {
      console.log(getSubDogsError)
    } 
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  
  renderItem = ({ item }) => {
    const {getImgDogs} = this.props;
    return (
      <TouchableOpacity onPress={() => {getImgDogs(item.name)}} style={{width:'45%',justifyContent:'center',borderRadius:10,alignItems:'center',height:120,backgroundColor:'white',borderWidth:1,marginHorizontal:'2%',marginVertical:'2%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
          <Image source={require('../../../assets/bg-petshop.png')} style={{width:'100%',height:'100%',position:'absolute',borderRadius:10,opacity:0.4}} />
          <Text style={{fontSize:18,fontWeight:'700'}}>{item.name}</Text>
      </TouchableOpacity>
     
    );
  };

  render(){
    const DATA = this.props.route.params.data;
    const filteredData = DATA.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex:1,alignItems:'center',paddingVertical:'2%'}}>
          <Text style={{fontSize:20,textAlign:'center',color:'#99cccc',fontWeight:'bold',fontStyle:'italic'}}>SELAMAT DATANG DI {'\n'} HASBI PET SHOP</Text>
        </View>
        <View style={{flex:1}}>
        <Image source={require('../../../assets/bg-top.png')} style={{width:'90%',height:60,position:'absolute',top:-5,opacity:0.4,alignSelf:'center',borderRadius:10}}/>
        <SearchInput 
          onChangeText={(term) => { this.searchUpdated(term) }} 
          style={{padding: 8,borderColor: '#CCC',width:'90%',alignSelf:'center'}}
          placeholder="Cari Jenis Anjing..."
          
          />
        </View>
        <View style={{flex:9}}>
            <FlatList
            data={filteredData}
            renderItem={item => this.renderItem(item)}
            numColumns={2}
            />
        </View>
      </SafeAreaView>
    );
  }
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%"
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

function mapStateToProps(state) {
  return {
    getSubDogsSuccess : state.getSubDogs.result,
    getSubDogsError : state.getSubDogs.error,
    getImgDogsSuccess : state.getImgDogs.result,
    getImgDogsError : state.getImgDogs.error
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getSubDogs,getImgDogs }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(DogListScreen);