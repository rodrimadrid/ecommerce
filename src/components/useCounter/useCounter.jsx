import  {useState} from 'react';

const useCounter = (initial) => {
    const [count, setCount] = useState(initial)

    const increment = () => {
        setCount(count+1)
    }

    const decrement = () => {
        setCount(count-1)
    }
    
    const setCounter = (n) => {
        setCount(+n);
    }

    return {count, increment, decrement, setCounter};
};

export default useCounter;