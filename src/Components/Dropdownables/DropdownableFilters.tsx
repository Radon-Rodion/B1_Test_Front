import { SetStateAction, useEffect, useState } from "react";
import { IStyleable, defaultIStyleableProps } from "../../Helpers/Interfaces";
import classes from './Dropdownables.module.scss';
import SwitchInput from "../../Elements/Inputs/SwitchInput";
import { RootState } from "../../Redux/Store/Store";
import { useSelector } from "react-redux";
import { ISearchModel, animeTypeVariants, mangaTypeVariants } from "../../Models/ISearchModel";
import DropdownableBase from "./DropdownableBase";
import Column from "../../Elements/Flexers/Column";
import classNames from './Dropdownables.module.scss';
import BaseInput from "../../Elements/Inputs/BaseInput";
import Row from "../../Elements/Flexers/Row";
import SelectorInput from "../../Elements/Inputs/SelectorInput";
import DateInput from "../../Elements/Inputs/DateInput";
import BaseButton from "../../Elements/Buttons/BaseButton";

interface IDropdownableFiltersProps extends IStyleable {
    model: ISearchModel,
    setModel: React.Dispatch<SetStateAction<ISearchModel>>,
    applyFilters: () => void,
    isAnime: boolean
};

const DropdownableFilters = ({ model, setModel, applyFilters, isAnime }: IDropdownableFiltersProps) => {
    const [show, setShow] = useState(false);

    const filterValueSetterCreator = (filter: keyof (ISearchModel)) => (val: string | number) => {
        setModel(st => {
            const newSt = { ...st };
            newSt[filter] = val;
            return newSt;
        })
    }

    const typeVariants = isAnime ? animeTypeVariants : mangaTypeVariants;

    return <DropdownableBase name='Фильтры' className={classNames.filters}><>
        <Row style={{marginBottom: '5px'}}>
            <Column xl='4'>Текстовый фрагмент:</Column>
            <Column xl='8'>
                <BaseInput value={model.q} setter={filterValueSetterCreator('q')} />
            </Column>
        </Row>
        <Row style={{marginBottom: '5px'}}>
            <Column xl='4'>Тип:</Column>
            <Column xl='8'>
                <SelectorInput options={typeVariants} value={model.type} setter={filterValueSetterCreator('type')} />
            </Column>
        </Row>
        <Row style={{marginBottom: '5px'}}>
            <Column xl='2'>Оценка</Column>
            <Column xl='1'>От:</Column>
            <Column xl='4'>
                <BaseInput type='number' value={model.min_score} setter={filterValueSetterCreator('min_score')} />
            </Column>
            <Column xl='1'>До:</Column>
            <Column xl='4'>
                <BaseInput type='number' value={model.max_score} setter={filterValueSetterCreator('max_score')} />
            </Column>
        </Row>
        <Row style={{marginBottom: '5px'}}>
            <Column xl='2'>Дата выхода</Column>
            <Column xl='1'>С:</Column>
            <Column xl='4'>
                <DateInput value={model.start_date} setter={filterValueSetterCreator('start_date')} />
            </Column>
            <Column xl='1'>По:</Column>
            <Column xl='4'>
                <DateInput value={model.end_date} setter={filterValueSetterCreator('end_date')} />
            </Column>
        </Row>
        <BaseButton onClick={() => applyFilters()} className={classNames.filtersBtn}>Применить</BaseButton>
    </></DropdownableBase>
}

DropdownableFilters.defaultProps = { ...defaultIStyleableProps };

export default DropdownableFilters;