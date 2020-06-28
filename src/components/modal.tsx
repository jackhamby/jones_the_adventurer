

import * as React from 'react';

interface ModalState {
    showModal: boolean;
}

interface ModalProps {
    header: string;
    content: JSX.Element;
    link: JSX.Element;
    onModalShow: Function;
    onModalHide: Function;

}

export class Modal extends React.Component<ModalProps, ModalState> {

    constructor(props: ModalProps){
        super(props);
        this.state = {
            showModal: false,
        }
    }

    componentDidUpdate(previousProps: ModalProps, previousState: ModalState){
        if (this.state.showModal != previousState.showModal){
            if (this.state.showModal){
                this.props.onModalShow();
            } else {
                this.props.onModalHide();
            }
        } 
    }

    render(){
        if (this.state.showModal){
            return (
                <>
                    <div className="p-3" style={{position: 'fixed', width: '600px', height: '400px', backgroundColor: 'white', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid gray', zIndex: 9999999}}>
                        <h1 style={{height: '15%'}}>
                            {this.props.header}
                        </h1>
                        <div className="p-3" style={{height: '70%'}}>
                            {this.props.content}
                        </div>

                        <div style={{height: '15%', textAlign: 'right'}}> 
                            <button onClick={() => { this.setState({showModal: false})}}>
                                done
                            </button>
                        </div>
                

                    </div>
                    <div onClick={() => { this.setState({showModal: true})}}>    
                        {this.props.link}
                    </div>
                </>
            );
        }
        return (
            <div onClick={() => { this.setState({showModal: true})}}>   
                {this.props.link}
             </div>
        );
    }

}