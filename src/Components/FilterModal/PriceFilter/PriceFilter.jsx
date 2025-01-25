import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { setMinPrice, setMaxPrice } from '../../Store/FilterSlice';




export default function PriceFilter() {
  
  let dispatch = useDispatch()
  
  const priceRange = useSelector((Store)=> Store.filter.priceRange)
  
  function valuetext(value) {
    return `${value}`;
  }

  const handlePriceChange = (event, newValue, activeThumb) => {
    if(!Array.isArray(newValue)){
      return;
    }
    if(activeThumb == 0){
      dispatch(setMinPrice(newValue))
    }else{
      dispatch(setMaxPrice(newValue))
    }
  }
  

  return (
    <Box sx={{ width: "90%"}}>
      <Slider
        sx={{color: "#ff6525"}}
        getAriaLabel={() => 'Minimum Difference'}
        value={priceRange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        onChange={handlePriceChange}
        min={500}
        max={200000}
        disableSwap
      />
    </Box>
  );
}
