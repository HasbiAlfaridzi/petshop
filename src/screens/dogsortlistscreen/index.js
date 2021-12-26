import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity,View,Image } from "react-native";
import { Icon } from 'native-base';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getImgDogs } from '../../actions/dog/index';
import RNRestart from 'react-native-restart';

const KEYS_TO_FILTERS = ['name'];
const DATA = [];
class DogSortListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenTitle: 'DogSortListScreen',
      searchTerm: '',
      dogId:''
    };
  }

  componentDidMount = async() => {
    const {dataDogAll,data} = this.state;
    const {getImgDogs} = this.props;
  }

  componentDidUpdate = async(prevProps, prevState) => {
    const{getImgDogsSuccess,getImgDogsError} = this.props;
    if (getImgDogsSuccess && prevProps.getImgDogsSuccess !== getImgDogsSuccess) {
      const DATA = [];
      await getImgDogsSuccess.map((data,index) => {
        const e = data.split('/');
        const imageName = e[5].split('.')
        const x = e[4].split('-');
        if(this.state.dogId == x[1]){
           DATA.push({"id":index,"name":data,"jenis":e[4],imgName:imageName[0]})
        }
       
      })

      if(DATA.length > 0){
        this.props.navigation.navigate('DogSubSortListScreen',{data : DATA})
      }
    } 
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  
  handleShowSort = async(data) => {
    const {getImgDogs} = this.props;
    await this.setState({
      dogId : data.name
    })
    await getImgDogs(data.jenis)
  }


  renderItem = ({ item }) => {
    const {getImgDogs} = this.props;
    return (
      <TouchableOpacity onPress={() => {this.handleShowSort(item)}} style={{width:'45%',justifyContent:'center',borderRadius:10,alignItems:'center',height:120,backgroundColor:'white',borderWidth:1,marginHorizontal:'2%',marginVertical:'2%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
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
        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <View style={{flex:1,alignItems:'flex-end'}}>
            <TouchableOpacity onPress={() => {RNRestart.Restart()}} style={{alignItems:'flex-end',width:'70%',height:'70%',borderRadius:8}}>
              <Icon type='MaterialIcons' name="arrow-back" style={{fontSize:40,color:'#99cccc'}} />
            </TouchableOpacity>
          </View>
          <View style={{flex:6,alignItems:'center'}}>
            <Text style={{fontSize:23,fontStyle:'italic',color:'#99cccc'}}>Pilih Sub Jenis Anjing</Text>
          </View>
        </View>
        <View style={{flex:10}}>
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
    getImgDogsSuccess : state.getImgDogs.result,
    getImgDogsError : state.getImgDogs.error
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getImgDogs }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(DogSortListScreen);