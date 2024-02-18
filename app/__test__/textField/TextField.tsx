import React, {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  HTMLInputTypeAttribute,
  MouseEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useRef,
  useEffect,
} from "react"
import FormItemResponseProps from "@components/library/form/FormItemResponseProps"
import ErrorText from "@components/library/form/ErrorText"
import Label from "@components/library/form/Label"
import Icon, { IconProps } from "@components/library/Icon"
import ButtonIcon from "@components/library/ButtonIcon"
import { cn } from "tailwind-cn"

// just extend this array if you want to add more key names
const KEY_NAMES = [
  "Enter",
  "Tab",
  "Delete",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  "Backspace",
  "Escape",
  "Spacebar",
  "Pause",
  "Insert",
  "CapsLock",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "PrintScreen",
  "ScrollLock",
  "MetaLeft",
  "MetaRight",
  "ContextMenu",
  "OSLeft",
  "OSRight",
  "ControlLeft",
  "ControlRight",
  "ShiftLeft",
  "ShiftRight",
  "AltLeft",
  "AltRight",
  "AudioVolumeDown",
  "AudioVolumeUp",
  "AudioVolumeMute",
  "MediaTrackNext",
  "MediaTrackPrevious",
  "MediaStop",
  "MediaPlayPause",
  "Semicolon",
  "Equal",
  "NumpadDecimal",
  "NumpadMultiply",
  "NumpadAdd",
  "NumpadSubtract",
  "NumpadDivide",
  "NumpadComma",
  "Numpad0",
  "Numpad1",
  "Numpad2",
  "Numpad3",
  "Numpad4",
  "Numpad5",
  "Numpad6",
  "Numpad7",
  "Numpad8",
  "Numpad9",
  "Digit0",
  "Digit1",
  "Digit2",
  "Digit3",
  "Digit4",
  "Digit5",
  "Digit6",
  "Digit7",
  "Digit8",
  "Digit9",
  "KeyA",
  "KeyB",
  "KeyC",
  "KeyD",
  "KeyE",
  "KeyF",
  "KeyG",
  "KeyH",
  "KeyI",
  "KeyJ",
  "KeyK",
  "KeyL",
  "KeyM",
  "KeyN",
  "KeyO",
  "KeyP",
  "KeyQ",
  "KeyR",
  "KeyS",
  "KeyT",
  "KeyU",
  "KeyV",
  "KeyW",
  "KeyX",
  "KeyY",
  "KeyZ",
  "Meta",
  "ContextMenu",
  "Escape",
  "OSLeft",
  "OSRight",
  "ScrollLock",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "ArrowLeft",
  "ArrowUp",
  "ArrowRight",
  "ArrowDown",
  "NumpadMultiply",
  "NumpadAdd",
  "NumpadSubtract",
  "NumpadDecimal",
  "NumpadDivide",
  "Backspace",
  "Enter",
  "Tab",
  "Escape",
  "ShiftLeft",
  "ShiftRight",
  "ControlLeft",
  "ControlRight",
  "AltLeft",
  "AltRight",
  "CapsLock",
  "AudioVolumeMute",
  "AudioVolumeDown",
  "AudioVolumeUp",
  "MediaTrackNext",
  "MediaTrackPrevious",
  "MediaStop",
  "MediaPlayPause",
  "Semicolon",
  "Equal",
  "Numpad0",
  "Numpad1",
  "Numpad2",
  "Numpad3",
  "Numpad4",
  "Numpad5",
  "Numpad6",
  "Numpad7",
  "Numpad8",
  "Numpad9",
  "KeyA",
  "KeyB",
  "KeyC",
  "KeyD",
  "KeyE",
  "KeyF",
  "KeyG",
  "KeyH",
  "KeyI",
  "KeyJ",
  "KeyK",
  "KeyL",
  "KeyM",
  "KeyN",
  "KeyO",
  "KeyP",
  "KeyQ",
  "KeyR",
  "KeyS",
  "KeyT",
  "KeyU",
  "KeyV",
  "KeyW",
  "KeyX",
  "KeyY",
  "KeyZ",
  "MetaLeft",
  "MetaRight",
  "ContextMenu",
] as const

export interface TextFieldProps {
  /**
   * An optional unique ID for the input element.
   */
  id?: string
  /**
   * The label text for the input.
   */
  label?: string
  /**
   * Additional class name for the label element.
   */
  labelClassName?: string
  /**
   * The placeholder text for the input.
   */
  placeholder?: string
  /**
   * The type of the input element, e.g., "text", "number", "email".
   * @default "text"
   */
  type?: HTMLInputTypeAttribute
  /**
   * The current value of the input.
   */
  value?: string | number
  /**
   * Determines whether the input has rounded corners.
   * @default true
   */
  isRounded?: boolean
  /**
   * Disables the input field.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Marks the input as required.
   * @default false
   */
  isRequired?: boolean
  /**
   * Makes the input read-only.
   * @default false
   */
  isReadOnly?: boolean
  /**
   * Minimum length allowed for input (used with isRequired).
   * @default 1
   */
  minLen?: number
  /**
   * Maximum length allowed for input.
   * @default 255
   */
  maxLen?: number
  /**
   * Error text to display below the input when there is an error.
   */
  errorText?: string
  /**
   * The name attribute for the input element.
   */
  name?: string
  /**
   * Hint text to display below the input.
   *
   * @type {string}
   * @memberof TextFieldProps
   */
  hintText?: string
  /**
   * Additional class name for the input element.
   */
  className?: string
  /**
   * Additional class name for the container div of the input.
   */
  shellClassName?: string
  /**
   * The height of the input field.
   * @default "md"
   */
  fieldHeight?: "sm" | "md" | "lg"
  /**
   * Whether to show an error icon when there is an error.
   * @default false
   */
  showErrorIcon?: boolean
  /**
   * The size of the icons.
   * @default "20px"
   */
  iconSize?: string
  /**
   * The stroke width of the icons.
   * @default "2px"
   */
  iconStrokeWidth?: string
  /**
   * The color of the icons.
   * @default "#98a2b3"
   */
  iconColor?: string
  /**
   * The name of the left icon (if any).
   * @default undefined
   */
  leftIconName?: IconProps["iconName"]
  /**
   * The name of the right icon (if any).
   * @default undefined
   */
  rightIconName?: IconProps["iconName"]
  /**
   * Determines if the right icon is clickable.
   * @default false
   */
  isRightIconClickable?: boolean
  /**
   * The name of the error icon.
   * @default "#f43f5e"
   */
  errorIconColor?: string
  /**
   * The name of the error icon.
   * @default "alert-triangle"
   */
  errorIconName?: IconProps["iconName"]
  /**
   * The step size (used with type "number").
   * @default 1
   */
  stepSize?: number
  /**
   * Whether to get the target element in the onChange callback.
   * @default false
   */
  getTargetElement?: boolean
  /**
   * Whether the input should be focused initially.
   * @default false
   */
  shouldFocus?: boolean
  /**
   * Callback when the input is clicked.
   * @default undefined
   */
  onClick?: (e: MouseEvent<HTMLInputElement>) => void
  /**
   * Callback when the input value changes.
   * @default undefined
   */
  onChange?: (e: FormItemResponseProps, event: ChangeEvent<HTMLInputElement>) => void
  /**
   * Callback when the input loses focus.
   * @default undefined
   */
  onBlur?: (e: FormItemResponseProps, event: FocusEvent<HTMLInputElement>) => void
  /**
   * Callback when the input gains focus.
   * @default undefined
   */
  onFocus?: (e: FormItemResponseProps, event: FocusEvent<HTMLElement>) => void
  /**
   * Callback when the input value changes.
   * @default undefined
   */
  onInput?: (e: FormItemResponseProps, event: FormEvent<HTMLInputElement>) => void
  /**
   * Keys that trigger the onKeyUp event.
   * @default `Enter`
   */
  onKeyUpKeyName?: (typeof KEY_NAMES)[number] | (typeof KEY_NAMES)[number][]
  /**
   * Callback when a key is released.
   * @default undefined
   */
  onKeyUp?: (e: FormItemResponseProps, event: KeyboardEvent<HTMLInputElement>) => void
  /**
   * Keys that trigger the onKeyDown event.
   * @default `Enter`
   */
  onKeyDownKeyName?: (typeof KEY_NAMES)[number] | (typeof KEY_NAMES)[number][]
  /**
   * Callback when a key is pressed down.
   * @default undefined
   */
  onKeyDown?: (e: FormItemResponseProps, event: KeyboardEvent<HTMLInputElement>) => void
  /**
   * Callback when the right icon is clicked.
   * @default undefined
   */
  onRightIconClick?: () => void
}

/**
 * TextField Component
 *
 * @description
 * Company - ARITS Ltd. 1st Jan 2023.
 * This component is used to render a text field
 * The tab component is capable of showing text, icons and badges with counts.
 * The tab component can have disabled tabs.
 * On click of a tab, the tab index is returned to the parent component.
 * The parent component can then use the index to render the content.
 * Please note,  require('@tailwindcss/forms'), is required in the tailwind.config.js file for this component to work.
 */

const TextField = ({
  id,
  label = "",
  labelClassName = "",
  placeholder = undefined,
  type = "text",
  value = "",
  isDisabled = false,
  isRounded = true,
  isRequired = false,
  isReadOnly = false,
  minLen = 1,
  maxLen = 255,
  errorText = "",
  name = "",
  hintText = "",
  className,
  shellClassName,
  fieldHeight = "md", //sm/md/lg
  showErrorIcon = false,
  leftIconName,
  rightIconName="heart",
  isRightIconClickable = false,
  iconSize = "20px",
  iconStrokeWidth = "2px",
  errorIconColor = "#f43f5e",
  errorIconName = "alert-triangle",
  iconColor = "#98a2b3",
  stepSize = 1,
  getTargetElement = false,
  shouldFocus = false,
  onClick,
  onChange,
  onBlur,
  onFocus,
  onKeyUpKeyName = "Enter",
  onKeyUp,
  onKeyDownKeyName = "Enter",
  onKeyDown,
  onInput,
  onRightIconClick,
}: TextFieldProps) => {
  const localRef = useRef<HTMLInputElement>(null)
  const isLeftIconValid = () => {
    return typeof leftIconName !== "undefined"
  }
  const isRightIconValid = () => {
    return typeof rightIconName !== "undefined"
  }

  const handleClick = (e: MouseEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()

      if (onChange) {
        let { value } = e.currentTarget
        value = type === "email" ? value.trim() : value

        try {
          if (getTargetElement) {
            const data: FormItemResponseProps = {
              data: value,
              status: 200,
              element: e.target,
            }
            onChange(data, e)
          } else {
            const data: FormItemResponseProps = {
              data: value,
              status: 200,
            }
            onChange(data, e)
          }
        } catch (err) {
          const data: FormItemResponseProps = {
            data: value,
            status: 500,
          }
          onChange(data, e)
        }
      }
    },
    [onChange]
  )

  const handleOnBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      e.preventDefault()

      if (onBlur) {
        const { value } = e.currentTarget

        try {
          const data: FormItemResponseProps = {
            data: value,
            status: 200,
          }
          onBlur(data, e)
        } catch (err) {
          const data: FormItemResponseProps = {
            data: value,
            status: 500,
          }
          onBlur(data, e)
        }
      }
    },
    [onBlur]
  )

  const handleOnFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      e.preventDefault()

      if (onFocus) {
        const { value } = e.currentTarget

        try {
          const data: FormItemResponseProps = {
            data: value,
            status: 200,
          }
          onFocus(data, e)
        } catch (err) {
          const data: FormItemResponseProps = {
            data: value,
            status: 500,
          }
          onFocus(data, e)
        }
      }
    },
    [onFocus]
  )

  const handleOnInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault()

      if (onInput) {
        const { value } = e.currentTarget

        try {
          const data: FormItemResponseProps = {
            data: value,
            status: 200,
          }
          onInput(data, e)
        } catch (err) {
          const data: FormItemResponseProps = {
            data: value,
            status: 500,
          }
          onInput(data, e)
        }
      }
    },
    [onInput]
  )

  const handleOnKeyUpEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyUp) {
        const { value } = event.currentTarget

        try {
          const data: FormItemResponseProps = {
            data: value,
            status: 200,
          }
          onKeyUp(data, event)
        } catch (err) {
          const data: FormItemResponseProps = {
            data: value,
            status: 500,
          }
          onKeyUp(data, event)
        }
      }
    },
    [onKeyUp]
  )

  const handleOnKeyDownEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (onKeyDown) {
        const { value } = event.currentTarget

        try {
          const data: FormItemResponseProps = {
            data: value,
            status: 200,
          }
          onKeyDown(data, event)
        } catch (err) {
          const data: FormItemResponseProps = {
            data: value,
            status: 500,
          }
          onKeyDown(data, event)
        }
      }
    },
    [onKeyDown]
  )

  const handleOnRightIconClick = useCallback(() => {
    if (onRightIconClick) {
      onRightIconClick()
    }
  }, [onRightIconClick])

  useEffect(() => {
    // if shouldFocus is true, focus on the input element
    shouldFocus && localRef?.current?.focus()
  }, [])

  return (
    <div className="altd-text-field w-full transition">
      {label.length > 0 ? <Label text={label} isRequired={isRequired} className={labelClassName} /> : null}
      <div
        className={cn(
          "relative bg-white dark:bg-slate-800",
          isRounded == true ? "rounded-md" : "",
          shellClassName
        )}
      >
        <input
          ref={localRef}
          value={value}
          onClick={(e) => handleClick(e)}
          onChange={(e) => handleOnChange(e)}
          onBlur={(e) => handleOnBlur(e)}
          onFocus={(e) => handleOnFocus(e)}
          onInput={(e) => handleOnInput(e)}
          onKeyUp={(e) => {
            const isValid =
              e.key === onKeyUpKeyName ||
              e.code === onKeyUpKeyName ||
              (Array.isArray(onKeyUpKeyName) &&
                onKeyUpKeyName.includes(e.key as (typeof onKeyUpKeyName)[number]))

            if (isValid) {
              onKeyUp && handleOnKeyUpEnter(e)
            }
          }}
          onKeyDown={(e) => {
            const isValid =
              e.key === onKeyDownKeyName ||
              e.code === onKeyDownKeyName ||
              (Array.isArray(onKeyDownKeyName) &&
                onKeyDownKeyName.includes(e.key as (typeof onKeyDownKeyName)[number]))

            if (isValid) {
              onKeyDown && handleOnKeyDownEnter(e)
            }
          }}
          disabled={isDisabled}
          type={type}
          name={name ? name : label}
          id={id ? id : label}
          readOnly={isReadOnly}
          step={type === "number" ? stepSize : undefined}
          minLength={isRequired ? minLen : 0}
          maxLength={maxLen}
          className={cn(
            "left-8 block w-full border font-medium text-slate-700 placeholder-slate-400",
            isRounded == true ? "rounded-md" : "",
            errorText.length > 0
              ? " border-red-300 ring-red-300 focus-within:border-red-500 focus-within:ring-red-500"
              : "border-slate-200 ring-slate-200 focus-within:border-primary-500 focus-within:ring-primary-500 focus:outline-none focus:ring-0",

            isLeftIconValid() ? "pl-36" : "pl-12",
            isRightIconValid() ? "pr-36" : "pr-8",
            fieldHeight == "sm" && "h-36",
            fieldHeight == "md" && "h-44",
            fieldHeight == "lg" && "h-52",

            isDisabled ? "!bg-slate-200 opacity-50 hover:hover:cursor-not-allowed" : "",
            className
          )}
          placeholder={placeholder ? placeholder : label}
        />
        {isLeftIconValid() ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-8">
            <Icon
              data-testid="heart" 
              iconName={leftIconName}
              iconSize={iconSize}
              iconColor={iconColor}
              iconStrokeWidth={iconStrokeWidth}
            />
          </div>
        ) : null}
        {isRightIconValid() ? (
          <div
            className={`${
              !isRightIconClickable && "pointer-events-none"
            } absolute inset-y-0 right-0 flex items-center pr-8`}
          >
            {isRightIconClickable ? (
              <ButtonIcon
              data-testid= "heart"
                iconName={rightIconName}
                iconSize={iconSize}
                iconColor={iconColor}
                iconStrokeWidth={iconStrokeWidth}
                clicked={() => handleOnRightIconClick()}
              />
            ) : (
              <Icon
              data-testid="heart" 
                iconName={rightIconName}
                iconSize={iconSize}
                iconColor={iconColor}
                iconStrokeWidth={iconStrokeWidth}
              />
            )}
          </div>
        ) : null}
        {errorText.length > 0 && showErrorIcon ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8">
            <Icon
            data-testid="heart" 
              iconName={errorIconName}
              iconSize={iconSize}
              iconColor={errorIconColor}
              iconStrokeWidth={iconStrokeWidth}
            />
          </div>
        ) : null}
      </div>
      {errorText.length > 0 ? <ErrorText text={errorText} /> : null}
      {hintText.length > 0 && errorText.length == 0 ? (
        <p
          className={`mt-2 text-sm !text-slate-500 ${errorText.length > 0 ? "" : "pt-4"}`}
          id="email-description"
        >
          {hintText}
        </p>
      ) : null}
    </div>
  )
}

export default memo(TextField)
