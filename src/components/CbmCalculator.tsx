"use client";

import { useMemo, useState } from "react";
import { ArrowClockwise, ArrowRight, Calculator, WhatsappLogo } from "@phosphor-icons/react";
import { trackEvent } from "../lib/analytics";
import { whatsappInquiryUrl } from "../lib/contact";

type Unit = "cm" | "mm" | "in";

type CalculatorValues = {
  unit: Unit;
  length: string;
  width: string;
  height: string;
  cartons: string;
  grossWeight: string;
};

type Calculation = {
  cbmPerCarton: number;
  totalCbm: number;
  totalCubicFeet: number;
  cartonsPerCbm: number;
  totalGrossWeight: number | null;
};

const emptyValues: CalculatorValues = {
  unit: "cm",
  length: "",
  width: "",
  height: "",
  cartons: "",
  grossWeight: "",
};

const unitToMeters: Record<Unit, number> = { cm: 0.01, mm: 0.001, in: 0.0254 };

function positiveNumber(value: string) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function formatNumber(value: number, maximumFractionDigits: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits, minimumFractionDigits: 0 }).format(value);
}

export function CbmCalculator() {
  const [values, setValues] = useState<CalculatorValues>(emptyValues);
  const [calculation, setCalculation] = useState<Calculation | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const parsed = useMemo(() => ({
    length: positiveNumber(values.length),
    width: positiveNumber(values.width),
    height: positiveNumber(values.height),
    cartons: positiveNumber(values.cartons),
    grossWeight: values.grossWeight.trim() ? positiveNumber(values.grossWeight) : null,
  }), [values]);

  const errors = submitted ? {
    length: parsed.length === null,
    width: parsed.width === null,
    height: parsed.height === null,
    cartons: parsed.cartons === null || !Number.isInteger(parsed.cartons),
    grossWeight: Boolean(values.grossWeight.trim()) && parsed.grossWeight === null,
  } : { length: false, width: false, height: false, cartons: false, grossWeight: false };

  const update = (field: keyof CalculatorValues, value: string) => {
    setValues(current => ({ ...current, [field]: value }));
    setCalculation(null);
  };

  const calculate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (!parsed.length || !parsed.width || !parsed.height || !parsed.cartons || !Number.isInteger(parsed.cartons) || (values.grossWeight.trim() && !parsed.grossWeight)) return;
    const factor = unitToMeters[values.unit];
    const cbmPerCarton = parsed.length * factor * parsed.width * factor * parsed.height * factor;
    const totalCbm = cbmPerCarton * parsed.cartons;
    setCalculation({
      cbmPerCarton,
      totalCbm,
      totalCubicFeet: totalCbm * 35.3146667,
      cartonsPerCbm: 1 / cbmPerCarton,
      totalGrossWeight: parsed.grossWeight ? parsed.grossWeight * parsed.cartons : null,
    });
    trackEvent("cbm_calculation", { unit: values.unit, cartons: parsed.cartons });
  };

  const reset = () => {
    setValues(emptyValues);
    setCalculation(null);
    setSubmitted(false);
  };

  const tryExample = () => {
    setValues({ unit: "cm", length: "50", width: "40", height: "30", cartons: "100", grossWeight: "8.5" });
    setCalculation(null);
    setSubmitted(false);
  };

  const whatsappUrl = calculation ? whatsappInquiryUrl(
    `Hello ANWELLUP, I am planning a food packaging shipment. Carton size: ${values.length} x ${values.width} x ${values.height} ${values.unit}. Cartons: ${values.cartons}. Total volume: ${formatNumber(calculation.totalCbm, 3)} CBM. Please help me review the product, packing and quotation.`
  ) : "";

  return <section className="cbm-tool" aria-labelledby="cbm-tool-title">
    <div className="cbm-tool-heading">
      <span className="eyebrow">Carton volume calculator</span>
      <h2 id="cbm-tool-title">Turn carton dimensions into shipment CBM.</h2>
      <p>Enter the outside carton dimensions and the number of cartons. Use one unit throughout.</p>
    </div>
    <div className="cbm-tool-surface">
      <form className="cbm-form" onSubmit={calculate} noValidate>
        <div className="cbm-form-header">
          <h3>Shipment inputs</h3>
          <button type="button" className="cbm-text-action" onClick={tryExample}>Try an example</button>
        </div>
        <label className="cbm-field cbm-unit-field">
          <span>Dimension unit</span>
          <select value={values.unit} onChange={event => update("unit", event.target.value as Unit)}>
            <option value="cm">Centimetres (cm)</option>
            <option value="mm">Millimetres (mm)</option>
            <option value="in">Inches (in)</option>
          </select>
        </label>
        <div className="cbm-dimensions" aria-label="Outside carton dimensions">
          <label className="cbm-field">
            <span>Length</span>
            <input type="number" min="0" step="any" inputMode="decimal" value={values.length} onChange={event => update("length", event.target.value)} aria-invalid={errors.length} aria-describedby={errors.length ? "length-error" : undefined}/>
            {errors.length && <small id="length-error">Enter a number greater than zero.</small>}
          </label>
          <label className="cbm-field">
            <span>Width</span>
            <input type="number" min="0" step="any" inputMode="decimal" value={values.width} onChange={event => update("width", event.target.value)} aria-invalid={errors.width} aria-describedby={errors.width ? "width-error" : undefined}/>
            {errors.width && <small id="width-error">Enter a number greater than zero.</small>}
          </label>
          <label className="cbm-field">
            <span>Height</span>
            <input type="number" min="0" step="any" inputMode="decimal" value={values.height} onChange={event => update("height", event.target.value)} aria-invalid={errors.height} aria-describedby={errors.height ? "height-error" : undefined}/>
            {errors.height && <small id="height-error">Enter a number greater than zero.</small>}
          </label>
        </div>
        <div className="cbm-order-fields">
          <label className="cbm-field">
            <span>Number of cartons</span>
            <input type="number" min="1" step="1" inputMode="numeric" value={values.cartons} onChange={event => update("cartons", event.target.value)} aria-invalid={errors.cartons} aria-describedby={errors.cartons ? "cartons-error" : undefined}/>
            {errors.cartons && <small id="cartons-error">Enter a whole number greater than zero.</small>}
          </label>
          <label className="cbm-field">
            <span>Gross weight per carton <em>optional</em></span>
            <input type="number" min="0" step="any" inputMode="decimal" value={values.grossWeight} onChange={event => update("grossWeight", event.target.value)} aria-invalid={errors.grossWeight} aria-describedby={errors.grossWeight ? "weight-error" : "weight-note"}/>
            {errors.grossWeight ? <small id="weight-error">Enter kilograms greater than zero.</small> : <small id="weight-note">Kilograms</small>}
          </label>
        </div>
        <div className="cbm-form-actions">
          <button type="submit" className="button button-dark"><Calculator size={18}/> Calculate CBM</button>
          <button type="button" className="cbm-reset" onClick={reset}><ArrowClockwise size={17}/> Reset</button>
        </div>
      </form>
      <div className="cbm-results" aria-live="polite">
        {calculation ? <>
          <div className="cbm-result-primary">
            <span>Total shipment volume</span>
            <strong>{formatNumber(calculation.totalCbm, 3)}</strong>
            <em>CBM</em>
          </div>
          <dl>
            <div><dt>CBM per carton</dt><dd>{formatNumber(calculation.cbmPerCarton, 5)}</dd></div>
            <div><dt>Total cubic feet</dt><dd>{formatNumber(calculation.totalCubicFeet, 1)} ft³</dd></div>
            <div><dt>Theoretical cartons per CBM</dt><dd>{formatNumber(calculation.cartonsPerCbm, 1)}</dd></div>
            {calculation.totalGrossWeight !== null && <div><dt>Total gross weight</dt><dd>{formatNumber(calculation.totalGrossWeight, 1)} kg</dd></div>}
          </dl>
          <p>The result uses outside carton dimensions. It does not include pallet space, loading gaps, weight limits or carrier rules.</p>
          <a className="cbm-result-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location="cbm_calculator_result"><WhatsappLogo size={19} weight="fill"/> Discuss this shipment <ArrowRight size={17}/></a>
        </> : <div className="cbm-empty">
          <Calculator size={33} weight="thin"/>
          <h3>Your result will appear here.</h3>
          <p>Use outside carton measurements. The calculator will show volume only after every required field is valid.</p>
          <code>CBM = L × W × H × cartons</code>
        </div>}
      </div>
    </div>
  </section>;
}
