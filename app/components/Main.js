import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    Image
} from 'react-native';

import Task from './Task';

export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            taskArray:[],
            taskText:'',
            taskKey:-1
        }
        this.getStorageTaskData();
    }

    saveTask(){
        if(this.state.taskText){
           if(this.state.taskKey>=0){
            this.editTask(this.state.taskKey);
           }else{
            this.addTask();
           }
        }
    }

    addTask(){
        let d = new Date();
        let obj = {
            'date':d.getFullYear()+
            "/"+(d.getMonth()+1) +
            "/"+ d.getDate(),
            'task': this.state.taskText,
            "status":false
        };
        this.state.taskArray.push(obj);
        this.setState({ taskArray: this.state.taskArray });
        this.setState({taskText:''});
        this.setState({taskKey:-1});
        this.saveStorageTaskData(this.state.taskArray);
    }
  

    editTask(key){
        this.state.taskArray[key].task=this.state.taskText;
        this.setState({taskArray: this.state.taskArray});
        this.setState({taskText:''});
        this.setState({taskKey:-1});
        this.saveStorageTaskData(this.state.taskArray);
    }

    deleteTask(key){
        this.state.taskArray.splice(key, 1);
        this.setState({taskArray: this.state.taskArray});
        this.setState({taskKey:-1});
        this.saveStorageTaskData(this.state.taskArray);
    }
    
    clickEditTask(key){
        this.setState({taskText:this.state.taskArray[key].task});
        this.setState({taskKey:key});
    }

    changeTask(key){ 
        this.state.taskArray[key].status=!this.state.taskArray[key].status;
        this.setState({taskArray: this.state.taskArray});
        this.setState({taskKey:-1});
        this.saveStorageTaskData(this.state.taskArray);
    }

    saveStorageTaskData(objs){
        AsyncStorage.setItem('tasks',JSON.stringify(objs));
    }

    getStorageTaskData = async ()=>{
        try {
            let tasks = await AsyncStorage.getItem('tasks');
            let parse = JSON.parse(tasks);
            this.setState({taskArray: parse});
        } catch (error) {
            alert(error);
        }
    }

    getButtonType(){
        return this.state.taskKey>=0?"#F48024":"#56CC9C";
    }

    render() {

        let tasks = this.state.taskArray.map((val,key)=>{
            return <Task key={key} keyval={key} val={val} deleteTask={()=> this.deleteTask(key) } clickEditTask={()=> this.clickEditTask(key)} changeTask={()=> this.changeTask(key)} />
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>- Lista de Tarefas -</Text>
                </View>
                <View style={styles.taskInputBlock} >
                    <TextInput 
                        style={styles.textInput}
                        onChangeText={(taskText)=>this.setState({taskText})}
                        value={this.state.taskText}
                        placeholder='Adicione uma nova tarefa'
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'>
                    </TextInput>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    {tasks}
                </ScrollView>
               
                <TouchableOpacity onPress={this.saveTask.bind(this)} style={[styles.addButton, {backgroundColor: this.getButtonType()}]} disabled={!this.state.taskText ? true : false} >
                    {this.state.taskKey>=0 ? <Image style={styles.stretch} source={require('../src/image/save.png')}/>:<Text style={styles.addButtonText}>+</Text>}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#2CA89B',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    taskInputBlock: {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth:2,
        borderTopColor: '#ededed'
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 10,
        backgroundColor: '#56CC9C',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});
