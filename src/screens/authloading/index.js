
import React, { Component } from "react";
import { getAllDogs } from '../../actions/dog/index';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container } from "native-base";
import { Image, ImageBackground } from 'react-native';

let DATAS = [];
class AuthLoading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screenTitle: 'AuthLoading',
    };
  }

  componentDidMount = async() => {
    const {getAllDogs} = this.props;
    setTimeout(() => {
      getAllDogs()
    },3000)
  }

  componentDidUpdate = async(prevProps) => {
    const { getAllDogsResult,getAllDogsError } = this.props;  

    if (getAllDogsResult && prevProps.getAllDogsResult !== getAllDogsResult) {
      await Object.entries(getAllDogsResult).map(([key, value]) => {
        DATAS.push({"id":key,"name":key})
      })
      if(DATAS !== []){
        this.props.navigation.navigate('DogListScreen',{data : DATAS})
      }
    } 
    
    if (getAllDogsError && prevProps.getAllDogsError !== getAllDogsError) {
      console.log(getAllDogsError)
    } 
  }
  
  render(){
    return (
      <Container style={{backgroundColor:'white'}}>
        <ImageBackground source={require('../../../assets/loading.gif')} style={{width:'100%',height:'100%'}} resizeMode="contain"/>
      </Container>
    );
  }
};

function mapStateToProps(state) {
  return {
    getAllDogsResult : state.getAllDogs.result,
    getAllDogsError : state.getAllDogs.error
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getAllDogs }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(AuthLoading);