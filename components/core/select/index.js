import { HStack, useToken, useFormControlContext } from '@chakra-ui/react';
import { forwardRef } from 'react';
import ReactSelect, { components } from 'react-select';
import controlFlow from './helper/controlFlow';

const Select = forwardRef(
  ({ onChange, value, isClearable, menuPlacement, icon, ...props }) => {
    const controlContext = useFormControlContext();

    const isDisabled =
      controlContext && controlContext.isReadOnly
        ? controlContext.isReadOnly
        : undefined;
    const fontSizeSm = useToken('fontSizes', 'sm');

    const customStyles = {
      indicatorSeparator: () => ({
        display: 'none',
      }),
      clearIndicator: () => ({
        display: 'none',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: 'gray',
      }),
      container: (provided) => ({
        ...provided,
        fontSize: fontSizeSm,
      }),
      control: (provided) => ({
        ...provided,
        backgroundColor: 'white',
      }),
      input: (provided) => ({
        ...provided,
        borderColor: 'none',
        color: 'black',
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: 'white',
        borderColor: 'none',
      }),
      option: (provided, state) => ({
        ...provided,
        color: controlFlow({
          if: [state.isFocused, 'white'],
          elseif: [state.isSelected, 'white'],
          else: 'black',
        }),
        backgroundColor: controlFlow({
          if: [state.isFocused, '#197BBD'],
          elseif: [state.isSelected, '#197BBD'],
          else: 'white',
        }),
        ':active': {
          color: 'white',
          backgroundColor: '#2D3748',
        },
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'black',
      }),
    };

    return (
      <ReactSelect
        value={value}
        styles={customStyles}
        isClearable={isClearable ? isClearable : false}
        menuPlacement={menuPlacement ? menuPlacement : 'bottom'}
        onChange={onChange}
        isDisabled={isDisabled}
        components={{
          Control: ({ children, ...rest }) => (
            <components.Control {...rest}>
              {icon ? (
                <HStack pl="3" spacing="0" w="full">
                  {icon}
                  {children}
                </HStack>
              ) : (
                children
              )}
            </components.Control>
          ),
        }}
        {...props}
      />
    );
  }
);

Select.displayName = 'CustomReactSelect';

export default Select;
