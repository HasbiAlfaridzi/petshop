import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity,View,Image } from "react-native";
import { Icon } from 'native-base';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSubDogs } from '../../actions/dog/index';
import RNRestart from 'react-native-restart'

const KEYS_TO_FILTERS = ['name'];
const DATA = [];
class DogSubSortListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenTitle: 'DogSubSortListScreen',
      searchTerm: '',
      dogId:''
    };
  }

  componentDidMount = async() => {
    const {dataDogAll,data} = this.state;
    const {getSubDogs} = this.props;
    const DATA = this.props.route.params.data;
    const txt = DATA[0].jenis;
    if(txt.search('-') == -1){
      await this.setState({
        dogId:txt
      })
    }else{
      res = txt.split('-');
      await this.setState({
        dogId: res[0]
      })
    }
    
  }

  componentDidUpdate = async(prevProps, prevState) => {
    const{getSubDogsSuccess,getSubDogsError} = this.props;
    if (getSubDogsSuccess && prevProps.getSubDogsSuccess !== getSubDogsSuccess) {
      const DATA = [];
      await getSubDogsSuccess.map((data,index) => {
        DATA.push({"id":index,"name":data,"jenis":this.state.dogId})
      })
      
      if(DATA.length > 0){
        this.props.navigation.navigate('DogSortListScreen',{data : DATA})
      }
    } 
    
    if (getSubDogsError && prevProps.getSubDogsError !== getSubDogsError) {
      console.log(getSubDogsError)
    } 
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  
  renderItem = ({ item }) => {
    return (
     <View style={{width:'45%',justifyContent:'center',borderRadius:10,alignItems:'center',height:120,marginHorizontal:'2%',marginVertical:'2%',backgroundColor:'white',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5}}>
       <Image source={{uri:item.name}} style={{width:'95%',height:'95%',borderRadius:15,opacity:0.8}} resizeMode="stretch" />
       <View style={{width:'100%',alignItems:'center',position:'absolute',bottom:'10%',backgroundColor:'rgba(0, 0, 0, 0.50)'}}>
        <Text style={{fontSize:12,fontWeight:'700',color:'white'}} numberOfLines={1}>{item.imgName}</Text>
       </View>
       
     </View>
    );
  };

  handleSort = async() => {
    const {dogId} = this.state;
    const {getSubDogs} = this.props;
    await getSubDogs(dogId)
  }

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
          <View style={{flex:6}}>
            <SearchInput 
              onChangeText={(term) => { this.searchUpdated(term) }} 
              style={{padding: 10,borderColor: '#CCC',borderWidth: 3,borderColor:'#99cccc',width:'90%',alignSelf:'center',borderRadius:10}}
              placeholder="Cari Anjing ..."
            />
          </View>
          <View style={{flex:1,alignItems:'flex-start'}}>
            <TouchableOpacity onPress={() => {this.handleSort()}} style={{alignItems:'flex-start',width:'70%',height:'70%',borderRadius:8}}>
              <Icon type='FontAwesome' name="sort" style={{fontSize:40,color:'#99cccc'}} />
            </TouchableOpacity>
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
    getSubDogsSuccess : state.getSubDogs.result,
    getSubDogsError : state.getSubDogs.error
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getSubDogs }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(DogSubSortListScreen);