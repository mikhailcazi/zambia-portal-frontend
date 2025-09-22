import { Label } from "@radix-ui/react-label";
import { FormField, FormItem } from "../form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  name: string;
  label?: string;
  questions: string[];
  options: string[];
}

function MultiRadioField({ name, label, questions, options }: Props) {
  // const [answers, setAnswers] = useState<Record<string, string>>({});

  // const handleChange = (q: string, v: string) => {
  //   setAnswers((prev) => ({ ...prev, [q]: v }));
  // };

  // useEffect(() => console.log(answers));

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          {label && <Label className="font-medium">{label}</Label>}

          <table className="table-fixed w-full border-collapse">
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td>
                    <Label className="text-sm" style={{ fontWeight: "400" }}>
                      {question}
                    </Label>
                  </td>

                  <td>
                    <RadioGroup
                      value={field.value?.[question] ?? ""}
                      onValueChange={(value) => {
                        const newValue = { ...field.value, [question]: value };
                        field.onChange(newValue); // update form state
                        // setAnswers(newValue); // update local state if needed
                      }}
                    >
                      <div className="flex items-center space-x-4 text-sm">
                        {options.map((option) => (
                          <div
                            key={option}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option}
                              id={`${question}-${option}`}
                            />
                            <Label htmlFor={`${question}-${option}`}>
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FormItem>
      )}
    />
  );
}

export default MultiRadioField;
