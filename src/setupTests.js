import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// to allow testing of components
configure({ adapter: new Adapter() });