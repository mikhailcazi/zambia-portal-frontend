// "use client";

// import { UseFormReturn } from "react-hook-form";
// import { z } from "zod";
// import { FormSchema } from "@/lib/schema/formSchema";
// import { Button } from "@/components/ui/button";
// import {
//   FormField,
//   FormItem,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { useFieldArray } from "react-hook-form";
// import { X, Plus } from "lucide-react";
// import { Input } from "../input";

// type FormType = z.infer<typeof FormSchema>;

// interface FormArrayFieldProps {
//   name: string;
//   label: string;
//   form: UseFormReturn<FormType>;
// }

// export default function FormArrayField({
//   name,
//   label,
//   form,
// }: FormArrayFieldProps) {
//   const { control } = form;
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name,
//   });

//   return (
//     <div className="space-y-2">
//       <h2 className="font-medium text-sm">{label}</h2>

//       <div className="">
//         <div className="grid grid-cols-12 border-b p-2 bg-muted text-sm font-medium text-muted-foreground">
//           <div className="col-span-6">Activity</div>
//           <div className="col-span-5">Amount Required</div>
//           <div className="col-span-1 text-center"></div>
//         </div>

//         {fields.map((field, index) => (
//           <div
//             key={field.id}
//             className="grid grid-cols-12 items-center p-2 gap-2"
//           >
//             <div className="col-span-6">
//               <FormField
//                 control={control}
//                 name={`funding.${index}.activity`}
//                 render={({ field }) => (
//                   <FormItem className="m-0">
//                     <FormControl>
//                       <Input {...field} placeholder="e.g. Site survey" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="col-span-5">
//               <FormField
//                 control={control}
//                 name={`funding.${index}.amount`}
//                 render={({ field }) => (
//                   <FormItem className="m-0">
//                     <FormControl>
//                       <Input type="text" {...field} placeholder="e.g. 10000" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="col-span-1 text-center">
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => remove(index)}
//               >
//                 <X size={16} />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Button
//         type="button"
//         variant="outline"
//         size="sm"
//         onClick={() => append({ activity: "", amount: "0" })}
//         className="flex gap-1"
//       >
//         <Plus size={14} />
//         Add Item
//       </Button>
//     </div>
//   );
// }
