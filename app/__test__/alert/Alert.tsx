import React from 'react';
import { memo } from "react"
import Button from "../../components/library/Button"
import ButtonIcon from "@components/library/ButtonIcon"
import Icon, { IconProps } from "@components/library/Icon"
import variables from "@variables/variables.module.scss"
import { cn } from "tailwind-cn"

export interface AlertProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
  iconName?: IconProps["iconName"]
  iconColor?: string
  iconSize?: string
  iconStrokeWidth?: string
  title?: string
  body?: string
  svgClass?: string
  showBtn?: boolean
  btnText?: string
  isBtnGhost?: boolean
  isBtnClicked?: Function
  isIconClicked: any
  className?: string
  hideCross?: boolean
}

/**
 * Alert Component
 *
 * @description
 * Company - ARITS Ltd. 4th Jan 2023.
 * This component is used to render different variants of alerts in the app.
 *
 * @property {string} variant variant of the Alert ("primary" | "secondary" | "success" | "warning" | "danger" | "info")
 * @property {string} iconColor Sets the color for the leading icon
 * @property {string} iconSize Sets the size for the leading icon
 * @property {string} iconStrokeWidth Sets the stroke for the leading icon
 * @param {string} title The header for the alert
 * @param {string} body The body text for the Alert
 * @property {string} svgClass Sets the Svg class for the Alert Component
 * @property {string} iconName Name for the icon in string
 * @property {boolean} showBtn Show or Hide the icon button
 * @property {boolean} isBtnGhost Enable Ghost button
 * @property {boolean} isBtnClicked Fire event if Button Clicked
 * @property {Function} isIconClicked Fire event if Icon Clicked (close icon)
 * @property {string} className Sets the class for the Alert Component
 * @property {boolean} hideCross Hide the close icon
 */

const Alert = memo(function Alert({
  variant = "info",
  iconName = "heart",
  iconSize = "18",
  iconStrokeWidth = "2px",
  iconColor = "currentColor",
  title = "Alert title",
  body = "Make sure you know how these changes affect you.",
  svgClass = "",
  showBtn = false,
  btnText = "Button",
  isBtnGhost,
  isBtnClicked,
  isIconClicked,
  className = "",
  hideCross = false,
}: AlertProps) {
  const handleIconClick = () => isIconClicked()
  const handleBtnClick = () => isBtnClicked?.()

  return (
    <div
    data-testid="alert"
    
      className={cn(
        "relative mb-8 rounded border-l-2 px-12 py-10 shadow-md",
        variant === "primary" && "border-primary-500 bg-primary-50 text-primary-700",
        variant === "secondary" && "border-secondary-500 bg-secondary-50 text-secondary-700",
        variant === "success" && "border-teal-500 bg-teal-50 text-teal-900",
        variant === "info" && "border-sky-500 bg-sky-100 text-sky-900",
        variant === "warning" && "border-amber-500 bg-amber-50 text-amber-900",
        variant === "danger" && "border-rose-500 bg-rose-100 text-rose-900",
        className
      )}
      role="alert"
    >
      <div className="flex">
        <div className="pr-8">
          {variant === "primary" ? (
            <Icon
              iconName={iconName}
              iconSize={iconSize}
              iconColor={iconColor}
              iconStrokeWidth={iconStrokeWidth}
              className={`pointer-events-none ${svgClass}`}
            />
          ) : (
            ""
          )}
          {variant === "secondary" ? (
            <Icon
              iconName={iconName}
              iconSize={iconSize}
              iconColor={iconColor}
              iconStrokeWidth={iconStrokeWidth}
              className={`pointer-events-none ${svgClass}`}
            />
          ) : (
            ""
          )}
          {variant === "success" ? (
            <Icon
              iconName={"check-circle"}
              iconSize={iconSize}
              iconColor={iconColor}
              iconStrokeWidth={iconStrokeWidth}
              className={`pointer-events-none ${svgClass}`}
            />
          ) : (
            ""
          )}
          {variant === "warning" ? (
            <Icon
              iconName="alert-circle"
              iconSize={iconSize}
              iconColor={iconColor}
              iconStrokeWidth={iconStrokeWidth}
              className={`pointer-events-none ${svgClass}`}
            />
          ) : (
            ""
          )}
          {variant === "danger" ? (
            <Icon
              iconName="alert-triangle"
              iconSize={iconSize}
              iconColor={iconColor}
              iconStrokeWidth={iconStrokeWidth}
              className={`pointer-events-none ${svgClass}`}
            />
          ) : (
            ""
          )}
          {variant === "info" ? (
            <Icon
              iconName="help-circle"
              iconSize={iconSize}
              iconColor={iconColor}
              iconStrokeWidth={iconStrokeWidth}
              className={`pointer-events-none ${svgClass}`}
            />
          ) : (
            ""
          )}
        </div>
        <div>
          <h6
            className={`mb-4 mt-2           
          ${
            variant === "primary"
              ? "text-primary-900"
              : variant === "secondary"
              ? "text-secondary-900"
              : variant === "success"
              ? "text-green-900"
              : variant === "warning"
              ? "text-amber-900"
              : variant === "danger"
              ? "text-rose-900"
              : variant === "info"
              ? "text-sky-900"
              : ""
          }   
          `}
          >
            {title}
          </h6>
          <p
            className={`pb-4 pr-8 text-sm
                    ${
                      variant === "primary"
                        ? "text-primary-900"
                        : variant === "secondary"
                        ? "text-secondary-900"
                        : variant === "success"
                        ? "text-green-900"
                        : variant === "warning"
                        ? "text-amber-900"
                        : variant === "danger"
                        ? "text-rose-900"
                        : variant === "info"
                        ? "text-sky-900"
                        : ""
                    }
          `}
          >
            {body}
          </p>
        </div>
        {!hideCross ? (
          <div className="absolute right-8 top-8 rounded-full text-slate-400 transition-colors hover:bg-rose-200 hover:text-rose-500">
            <ButtonIcon
              iconName="x-close"
              clicked={handleIconClick}
              className="p-4"
              iconColor={`${
                variant === "primary"
                  ? variables.primary900
                  : variant === "secondary"
                  ? variables.secondary900
                  : variant === "success"
                  ? variables.success900
                  : variant === "warning"
                  ? variables.warning900
                  : variant === "danger"
                  ? variables.danger900
                  : variant === "info"
                  ? variables.info900
                  : ""
              }
              `}
              data-testid="close-button" 
            />
          </div>
        ) : null}
        {showBtn ? (
          <Button
          data-testid="close-button" 

            btnText={btnText}
            outline={isBtnGhost}
            variant={variant}
            className="ml-40 self-end"
            size="sm"
            clicked={handleBtnClick}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  )
})

export default Alert
