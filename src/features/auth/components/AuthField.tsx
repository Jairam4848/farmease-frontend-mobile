import { type ComponentProps, type Ref, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { authColors as c } from "./auth-theme";

type AuthFieldProps = ComponentProps<typeof TextInput> & {
  label: string;
  error?: string;
  hint?: string;
  password?: boolean;
  inputRef?: Ref<TextInput>;
};

export function AuthField({
  label,
  error,
  hint,
  password = false,
  inputRef,
  style,
  ...props
}: AuthFieldProps) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          focused && styles.focused,
          !!error && styles.invalid,
        ]}
      >
        <TextInput
          {...props}
          ref={inputRef}
          accessibilityLabel={label}
          accessibilityHint={error ?? hint}
          placeholderTextColor="#85917E"
          selectionColor={c.ink}
          underlineColorAndroid="transparent"
          secureTextEntry={password ? !visible : props.secureTextEntry}
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
          style={[styles.input, style]}
        />
        {password && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={visible ? "Hide password" : "Show password"}
            disabled={props.editable === false}
            onPress={() => setVisible(!visible)}
            style={styles.toggle}
          >
            <Text style={styles.toggleText}>{visible ? "Hide" : "Show"}</Text>
          </Pressable>
        )}
      </View>
      {error ? (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 7 },
  label: { color: c.ink, fontSize: 12, fontWeight: "600" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 14,
    backgroundColor: c.white,
  },
  focused: { borderColor: c.ink, backgroundColor: "#F1F6E7" },
  invalid: { borderColor: c.error },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 54,
    color: c.ink,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 14,
  },
  toggle: {
    minHeight: 48,
    minWidth: 56,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  toggleText: { color: c.ink, fontSize: 12, fontWeight: "600" },
  error: { color: c.error, fontSize: 12, lineHeight: 17 },
  hint: { color: c.muted, fontSize: 11, lineHeight: 16 },
});
