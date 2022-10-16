import {useEffect} from 'react'
import { List } from './List'
import { useSelector } from 'react-redux';
import {SelectViewComponent} from '../SelectViewComponent'

export default function Wrapper() {
  const isSelectView = useSelector((state) => state.selectView.id);
  useEffect(() => {
    console.log(isSelectView);
  }, [isSelectView]);
  return (
    <>
      {!isSelectView ? <List /> : <SelectViewComponent />}
    </>
  )
}
