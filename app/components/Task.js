import React from 'react';
import {
    StyleSheet,
    Text,
    View, 
    TouchableOpacity,
    Image
} from 'react-native';

export default class Task extends React.Component {

    getStyleStatus(status){
        return status?"#82F29F":"#BCBBBB";
    }

    render() {
        return (
            <View key={this.props.keyval} style={styles.task}>

                <Text onPress={this.props.changeTask} style={styles.taskText}>{this.props.val.date}</Text>
                <Text onPress={this.props.changeTask} style={[styles.taskText, {borderLeftColor: this.getStyleStatus(this.props.val.status)}]}>{this.props.val.task} </Text>

                <TouchableOpacity onPress={this.props.clickEditTask} style={styles.taskEdit}>
                    <Image style={styles.stretch} source={require('../src/image/edit.png')}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.deleteTask} style={styles.taskDelete}>
                <Image style={styles.stretch} source={require('../src/image/delete.png')}/>
                </TouchableOpacity>                

            </View>
        );
    }
}

const styles = StyleSheet.create({
    task: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth:2,
        borderBottomColor: '#ededed'
    },
    taskText: {
        paddingLeft: 20,
        borderLeftWidth: 10,       
    },
    taskDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CF3F2F',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    taskEdit: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBBC05',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 50
    },
    taskTextWhite: {
        color: 'white'
    }
});
