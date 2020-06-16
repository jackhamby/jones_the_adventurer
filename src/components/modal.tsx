

import * as React from 'react';

interface ModalState {
    showModal: boolean;
}

interface ModalProps {
    header: string;
    content: JSX.Element;
}

export class Modal extends React.Component<{}, ModalState> {

    componentDidMount(){
        this.state = {
            showModal: false,
        }
    }

    render(){
        if (this.state && this.state.showModal){
            return (
                <>
                    <div style={{position: 'absolute', width: '600px', height: '400px', backgroundColor: 'white', top: '50%', left: '50%',  transform: 'translate(-50%, -50%)'}}>
    
                        modal

                        <button onClick={() => { this.setState({showModal: false})}}>
                            close
                        </button>

                    </div>
                    <button onClick={() => { this.setState({showModal: true})}}>    

                    Open
                    </button>
                </>
            );
        }
        return (
            <button onClick={() => { this.setState({showModal: true})}}>   
                Open
             </button>);
    }

}