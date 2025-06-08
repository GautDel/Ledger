import {Form} from './components/form/Form'
import {Banner} from './components/Banner'
import { Notifications } from './components/Notifications';
import { FormProvider } from './components/form/contexts/FormContext';
import './App.css';

function App() {

    return (
	<div id="App">
		<Banner title="Generate An Invoice"/> 
        <FormProvider>
            <Notifications />        
            <Form />
        </FormProvider>
	
	</div>
    )
}

export default App
