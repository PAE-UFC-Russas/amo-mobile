import { sum } from "../../src/util/sum";
import {render} from '@testing-library/react-native';

const Button = () => {
  return <button>Text</button>

}

test('should add button in document', () => {
  const { getByTag } = render(<Button />)

  const btnElemet = getByTag('Text');
  expect(btnElemet).toBeInTheDocument()
})

// test('renders learn react link', () => {
//   const {getByText} = render(<App />)
//   const linkElemnt = getByText(/learn react/i)
//   expect(linkElemnt).toBeInTheDocument();

// });

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});