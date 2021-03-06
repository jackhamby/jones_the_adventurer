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
        if (this.state.showModal !== previousState.showModal){
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
                    <div className="p-1" style={{position: 'fixed', width: 'auto', height: 'auto', minWidth: '600px', minHeight: '400px', backgroundColor: 'white', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid gray', zIndex: 9999999}}>
                        <div className="p-2" style={{fontSize: '10px'}}>
                            {this.props.header}
                        </div>
                        <div className="p-2" style={{height: '80%'}}>
                            {this.props.content}
                        </div>

                        <div style={{height: '15%', textAlign: 'right'}}> 
                            <button style={{position: 'sticky'}} onClick={() => { this.setState({showModal: false})}}>
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